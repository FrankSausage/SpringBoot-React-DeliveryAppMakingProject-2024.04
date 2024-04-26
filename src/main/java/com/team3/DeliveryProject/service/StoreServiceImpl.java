package com.team3.DeliveryProject.service;

import static com.team3.DeliveryProject.responseCode.ResponseCode.ADDRESS_ADD_SUCCESS;
import static com.team3.DeliveryProject.responseCode.ResponseCode.STORE_ADD_SUCCESS;
import static com.team3.DeliveryProject.responseCode.ResponseCode.USER_SIGNUP_SUCCESS;

import com.team3.DeliveryProject.dto.common.Response;
import com.team3.DeliveryProject.dto.request.store.StoreAddRequestDto;
import com.team3.DeliveryProject.entity.Stores;
import com.team3.DeliveryProject.repository.StoresRepository;
import com.team3.DeliveryProject.repository.UsersRepository;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class StoreServiceImpl implements StoreService{
    private final StoresRepository storesRepository;
    @Override
    public ResponseEntity<Response> addStore(StoreAddRequestDto requestDto) {
        Stores stores = new Stores(requestDto.getName(), requestDto.getType(),
            requestDto.getCategory(), requestDto.getAddress(), requestDto.getStorePictureName(),
            requestDto.getPhone(), requestDto.getContent(), requestDto.getMinDeliveryPrice(),
            requestDto.getDeliveryTip(),requestDto.getMinDeliveryTime(),
            requestDto.getMaxDeliveryTime(), 0,0,0,requestDto.getOperationHours(),
            requestDto.getClosedDays(), requestDto.getDeliveryAddress(),
            LocalDateTime.now(), LocalDateTime.now(),"일반");

        System.out.println("Dto -> Entity가 제대로 됫는지 출력해보기 (아래). 아직 저장전임 ㅇㅇ");
        System.out.println(stores);

        Long storeId = storesRepository.save(stores).getStoreId();
        System.out.println("저장된거 제대로 됫는지 출력해보기 (아래)");
        System.out.println(storesRepository.findById(storeId));
        return Response.toResponseEntity(STORE_ADD_SUCCESS);
    }
}
