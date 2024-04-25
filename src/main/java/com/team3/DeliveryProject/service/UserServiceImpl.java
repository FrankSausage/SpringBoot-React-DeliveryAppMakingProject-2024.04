package com.team3.DeliveryProject.service;

import static com.team3.DeliveryProject.responseCode.ErrorCode.USERNAME_IS_ALREADY_EXIST;
import static com.team3.DeliveryProject.responseCode.ErrorCode.USER_EMAIL_IS_ALREADY_EXIST;
import static com.team3.DeliveryProject.responseCode.ResponseCode.USER_DELETE_SUCCESS;
import static com.team3.DeliveryProject.responseCode.ResponseCode.USER_SIGNUP_SUCCESS;
import static com.team3.DeliveryProject.responseCode.ResponseCode.USER_UPDATE_SUCCESS;

import com.team3.DeliveryProject.dto.common.Response;
import com.team3.DeliveryProject.entity.Address;
import com.team3.DeliveryProject.entity.Users;
import com.team3.DeliveryProject.repository.AddressRepository;
import com.team3.DeliveryProject.repository.UsersRepository;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService{
    private final UsersRepository usersRepository;
    private final AddressRepository addressRepository;


    @Override
    public ResponseEntity<Response> signUp(Users user) {
        if (usersRepository.findUsersByUserId(user.getUserId()).isPresent()){
            System.out.println("회원가입 오류 (UserId가 중복되었습니다.)");
            return Response.toResponseEntity(USERNAME_IS_ALREADY_EXIST);
        } else if (usersRepository.findUsersByEmail(user.getEmail()).isPresent()) {
            System.out.println("회원가입 오류 (Email이 중복되었습니다.)");
            return Response.toResponseEntity(USER_EMAIL_IS_ALREADY_EXIST);
        }else{
            System.out.println("서비스 정상로직 진입");
            Users tmpUser = new Users(" ", user.getName(), user.getPhone(), user.getEmail(),0,
                user.getRole(), user.getCurrentAddress(), LocalDateTime.now(),LocalDateTime.now(), "일반", 0);
            usersRepository.save(tmpUser);

            Address address = new Address(tmpUser.getUserId(), tmpUser.getCurrentAddress(),
                LocalDateTime.now(),LocalDateTime.now(),"일반");
            System.out.println(tmpUser);
            addressRepository.save(address);
            return Response.toResponseEntity(USER_SIGNUP_SUCCESS);
        }
    }

    @Override
    public ResponseEntity<Response> updateUser(Users user) {
        System.out.println("서비스 정상로직 진입");
        Users users = usersRepository.findUsersByEmail(user.getEmail()).get();
        System.out.println("찾은 users 출력");
        System.out.println(users);
        users.setPhone(user.getPhone());
        users.setName(user.getName());
        users.setPassword(user.getPassword());
        users.setCurrentAddress(user.getCurrentAddress());
        System.out.println("바뀐 users 출력");
        System.out.println(users);
        usersRepository.save(users);
        return Response.toResponseEntity(USER_UPDATE_SUCCESS);
    }

    @Override
    public ResponseEntity<Response> deleteUser(Users user) {
        System.out.println("서비스 정상로직 진입");
        Users users = usersRepository.findUsersByEmail(user.getEmail()).orElseThrow(() -> new RuntimeException("User not found"));
        System.out.println("찾은 users 출력");
        System.out.println(users);;
        users.setStatus("탈퇴");
        System.out.println("바뀐 users 출력");
        System.out.println(users);
        usersRepository.save(users);
        return Response.toResponseEntity(USER_DELETE_SUCCESS);
    }
}
