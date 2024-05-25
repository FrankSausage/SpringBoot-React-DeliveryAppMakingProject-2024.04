package com.team3.DeliveryProject.service;

import static com.team3.DeliveryProject.responseCode.ErrorCode.USERNAME_IS_ALREADY_EXIST;
import static com.team3.DeliveryProject.responseCode.ErrorCode.USER_EMAIL_IS_ALREADY_EXIST;
import static com.team3.DeliveryProject.responseCode.ResponseCode.USER_DELETE_SUCCESS;
import static com.team3.DeliveryProject.responseCode.ResponseCode.USER_DIBS_SUCCESS;
import static com.team3.DeliveryProject.responseCode.ResponseCode.USER_SIGNUP_SUCCESS;
import static com.team3.DeliveryProject.responseCode.ResponseCode.USER_UPDATE_SUCCESS;

import com.team3.DeliveryProject.dto.common.Response;
import com.team3.DeliveryProject.dto.request.user.UserFavoriteListRequestDto;
import com.team3.DeliveryProject.dto.request.user.UserFavoriteRequestDto;
import com.team3.DeliveryProject.dto.response.user.UserFavoriteListInnerDibsListResponseDto;
import com.team3.DeliveryProject.dto.response.user.UserFavoriteListResponseDto;
import com.team3.DeliveryProject.entity.Address;
import com.team3.DeliveryProject.entity.Dibs;
import com.team3.DeliveryProject.entity.Stores;
import com.team3.DeliveryProject.entity.Users;
import com.team3.DeliveryProject.repository.AddressRepository;
import com.team3.DeliveryProject.repository.DibsRepository;
import com.team3.DeliveryProject.repository.StoresRepository;
import com.team3.DeliveryProject.repository.UsersRepository;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private final UsersRepository usersRepository;
    private final AddressRepository addressRepository;
    private final DibsRepository dibsRepository;
    private final StoresRepository storesRepository;


    @Override
    public ResponseEntity<Response> signUp(Users user) {
        if (usersRepository.findUsersByUserId(user.getUserId()).isPresent()) {
            return Response.toResponseEntity(USERNAME_IS_ALREADY_EXIST);
        } else if (usersRepository.findUsersByEmail(user.getEmail()).isPresent()) {
            return Response.toResponseEntity(USER_EMAIL_IS_ALREADY_EXIST);
        } else {
            Users tmpUser = new Users(" ", user.getName(), user.getPhone(), user.getEmail(), 1,
                user.getRole(), user.getCurrentAddress(), user.getAddressCode(),
                LocalDateTime.now(), LocalDateTime.now(), "일반", 0);
            usersRepository.save(tmpUser);

            Address address = new Address(tmpUser.getUserId(), tmpUser.getCurrentAddress(),
                tmpUser.getAddressCode(),
                LocalDateTime.now(), LocalDateTime.now(), "일반");
            addressRepository.save(address);
            return Response.toResponseEntity(USER_SIGNUP_SUCCESS);
        }
    }

    @Override
    public ResponseEntity<Response> updateUser(Users user) {
        Users users = usersRepository.findUsersByEmail(user.getEmail()).get();
        users.setPhone(user.getPhone());
        users.setName(user.getName());
        users.setCurrentAddress(user.getCurrentAddress());
        users.setAddressCode(user.getAddressCode());
        Long userId = usersRepository.save(users).getUserId();
        Address address = addressRepository.findAddressByUserId(userId).get();
        address.setAddress(users.getCurrentAddress());
        address.setAddressCode(users.getAddressCode());
        addressRepository.save(address);
        return Response.toResponseEntity(USER_UPDATE_SUCCESS);
    }

    @Override
    public ResponseEntity<Response> deleteUser(Users user) {
        Users users = usersRepository.findUsersByEmail(user.getEmail())
            .orElseThrow(() -> new RuntimeException("User not found"));
        users.setStatus("탈퇴");
        usersRepository.save(users);
        return Response.toResponseEntity(USER_DELETE_SUCCESS);
    }

    @Override
    public ResponseEntity<Response> favorite(UserFavoriteRequestDto requestDto) {
        Users users = usersRepository.findUsersByEmail(requestDto.getEmail())
            .orElseThrow(() -> new RuntimeException("User not found"));

        // Dibs 엔티티가 존재하는지 확인
        Optional<Dibs> optionalDibs = dibsRepository.findByUserIdAndStoreId(users.getUserId(), requestDto.getStoreId());

        if (optionalDibs.isPresent()) {
            // Dibs 엔티티가 존재한다면 status 업데이트
            Dibs existingDibs = optionalDibs.get();
            existingDibs.setStatus(requestDto.getStatus());
            existingDibs.setModifiedDate(LocalDateTime.now());
            dibsRepository.save(existingDibs);
        } else {
            // Dibs 엔티티가 존재하지 않으면 새로운 엔티티 생성
            Dibs newDibs = new Dibs(users.getUserId(), requestDto.getStoreId(), LocalDateTime.now(), LocalDateTime.now(), requestDto.getStatus());
            dibsRepository.save(newDibs);
        }

        return Response.toResponseEntity(USER_DIBS_SUCCESS);
    }

    @Override
    public UserFavoriteListResponseDto getFavoriteList(UserFavoriteListRequestDto requestDto) {
        Users users = usersRepository.findUsersByEmail(requestDto.getEmail())
            .orElseThrow(() -> new RuntimeException("User not found"));
        List<Optional<Dibs>> dibs = dibsRepository.findByUserId(users.getUserId());
        List<UserFavoriteListInnerDibsListResponseDto> dibsList = new ArrayList<>();
        for(Optional<Dibs> optionalDibs :dibs){
            if(optionalDibs.isPresent()){
                Stores stores = storesRepository.findById(optionalDibs.get().getStoreId()).
                    orElseThrow(()->new RuntimeException("Store not found"));
                if(optionalDibs.get().getStatus().equals("찜")){
                    UserFavoriteListInnerDibsListResponseDto innerDto = UserFavoriteListInnerDibsListResponseDto.builder()
                        .storeId(stores.getStoreId())
                        .storeName(stores.getName())
                        .storePictureName(stores.getStorePictureName())
                        .reviewCount(stores.getReviewCount())
                        .rating(stores.getRating())
                        .build();
                    dibsList.add(innerDto);
                }
            }
        }
        UserFavoriteListResponseDto responseDto = UserFavoriteListResponseDto.builder()
            .dibsList(dibsList)
            .build();
        return responseDto;
    }
}
