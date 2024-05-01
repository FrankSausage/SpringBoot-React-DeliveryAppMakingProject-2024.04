package com.team3.DeliveryProject.service;

import static com.team3.DeliveryProject.responseCode.ErrorCode.STORE_DELETE_FAIL;
import static com.team3.DeliveryProject.responseCode.ErrorCode.STORE_UPDATE_FAIL;
import static com.team3.DeliveryProject.responseCode.ResponseCode.ADDRESS_ADD_SUCCESS;
import static com.team3.DeliveryProject.responseCode.ResponseCode.STORE_ADD_SUCCESS;
import static com.team3.DeliveryProject.responseCode.ResponseCode.STORE_DELETE_SUCCESS;
import static com.team3.DeliveryProject.responseCode.ResponseCode.STORE_UPDATE_SUCCESS;
import static com.team3.DeliveryProject.responseCode.ResponseCode.USER_SIGNUP_SUCCESS;
import static com.team3.DeliveryProject.responseCode.ResponseCode.USER_UPDATE_SUCCESS;

import com.team3.DeliveryProject.dto.common.Response;
import com.team3.DeliveryProject.dto.request.store.StoreAddRequestDto;
import com.team3.DeliveryProject.dto.request.store.StoreDeleteRequestDto;
import com.team3.DeliveryProject.dto.request.store.StoreListRequestDto;
import com.team3.DeliveryProject.dto.request.store.StoreUpdateRequestDto;
import com.team3.DeliveryProject.entity.Stores;
import com.team3.DeliveryProject.entity.Users;
import com.team3.DeliveryProject.repository.StoresRepository;
import com.team3.DeliveryProject.repository.UsersRepository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class StoreServiceImpl implements StoreService{
    private final StoresRepository storesRepository;
    private final UsersRepository usersRepository;
    @Override
    public ResponseEntity<Response> addStore(StoreAddRequestDto requestDto) {
        Users users = usersRepository.findUsersByEmail(requestDto.getEmail()).orElseThrow(()-> new RuntimeException("user not found"));;
        Stores stores = new Stores(users.getUserId(),requestDto.getName(), requestDto.getType(),
            requestDto.getCategory(), requestDto.getAddress(), requestDto.getStorePictureName(),
            requestDto.getPhone(), requestDto.getContent(), requestDto.getMinDeliveryPrice(),
            requestDto.getDeliveryTip(),requestDto.getMinDeliveryTime(),
            requestDto.getMaxDeliveryTime(), 0,0,0,requestDto.getOperationHours(),
            requestDto.getClosedDays(),
            LocalDateTime.now(), LocalDateTime.now(),"일반");

        System.out.println("Dto -> Entity가 제대로 됫는지 출력해보기 (아래). 아직 저장전임 ㅇㅇ");
        System.out.println(stores);

        Long storeId = storesRepository.save(stores).getStoreId();
        System.out.println("저장된거 제대로 됫는지 출력해보기 (아래)");
        System.out.println(storesRepository.findById(storeId));
        return Response.toResponseEntity(STORE_ADD_SUCCESS);
    }

    @Override
    public ResponseEntity<Response> updateStore(StoreUpdateRequestDto requestDto) {
        Users users = usersRepository.findUsersByEmail(requestDto.getEmail()).orElseThrow(()-> new RuntimeException("user not found"));;
        Stores stores = storesRepository.findById(requestDto.getStoreId()).orElseThrow(()-> new RuntimeException("Store not found"));
        if(users.getUserId() == stores.getUserId()){
            stores.setName(requestDto.getName());
            stores.setType(requestDto.getType());
            stores.setCategory(requestDto.getCategory());
            stores.setAddress(requestDto.getAddress());
            stores.setStorePictureName(requestDto.getStorePictureName());
            stores.setPhone(requestDto.getPhone());
            stores.setContent(requestDto.getContent());
            stores.setMinDeliveryPrice(requestDto.getMinDeliveryPrice());
            stores.setDeliveryTip(requestDto.getDeliveryTip());
            stores.setMinDeliveryTime(requestDto.getMinDeliveryTime());
            stores.setMaxDeliveryTime(requestDto.getMaxDeliveryTime());
            stores.setOperationHours(requestDto.getOperationHours());
            stores.setClosedDays(requestDto.getClosedDays());
            stores.setModifiedDate(LocalDateTime.now());
            storesRepository.save(stores);
            return Response.toResponseEntity(STORE_UPDATE_SUCCESS);
        }else {
            return Response.toResponseEntity(STORE_UPDATE_FAIL);
        }
    }

    @Override
    public Optional<Stores> getUpdateStore(Long storeId) {
        return storesRepository.findById(storeId);
    }

    @Override
    public ResponseEntity<Response> deleteStore(StoreDeleteRequestDto requestDto) {
        Users users = usersRepository.findUsersByEmail(requestDto.getEmail()).orElseThrow(()-> new RuntimeException("user not found"));
        Stores stores = storesRepository.findById(requestDto.getStoreId()).orElseThrow(()-> new RuntimeException("Store not found"));
        if(users.getUserId() == stores.getUserId()){
            stores.setStatus("삭제");
            storesRepository.save(stores);
            return Response.toResponseEntity(STORE_DELETE_SUCCESS);
        }else{
            return Response.toResponseEntity(STORE_DELETE_FAIL);
        }
    }

//    @Override
//    public List<Stores> getStoreList(StoreListRequestDto requestDto) {
//        requestDto.
//        return null;
//    }
}
