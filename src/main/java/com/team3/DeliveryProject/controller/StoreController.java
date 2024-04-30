package com.team3.DeliveryProject.controller;

import com.team3.DeliveryProject.dto.request.store.StoreAddRequestDto;
import com.team3.DeliveryProject.dto.request.store.StoreDeleteRequestDto;
import com.team3.DeliveryProject.dto.request.store.StoreUpdateGetRequestDto;
import com.team3.DeliveryProject.dto.request.store.StoreUpdateRequestDto;
import com.team3.DeliveryProject.dto.request.user.UserSignUpRequestDto;
import com.team3.DeliveryProject.dto.response.store.StoreUpdateResponseDto;
import com.team3.DeliveryProject.entity.Stores;
import com.team3.DeliveryProject.repository.StoresRepository;
import com.team3.DeliveryProject.repository.UsersRepository;
import com.team3.DeliveryProject.service.StoreService;
import com.team3.DeliveryProject.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/store")
public class StoreController {

    @Autowired
    private StoreService storeService;

    @PostMapping("/register")
    public ResponseEntity<?> addStore(@RequestBody StoreAddRequestDto requestDto) {
        storeService.addStore(requestDto);
        return ResponseEntity.ok().body("Store add successfully");
    }

    @PostMapping("/update")
    public ResponseEntity<?> updateStore(@RequestBody StoreUpdateRequestDto requestDto) {
        storeService.updateStore(requestDto);
        return ResponseEntity.ok().body("Store update successfully");
    }
    @PostMapping("/delete")
    public ResponseEntity<?> deleteStore(@RequestBody StoreDeleteRequestDto requestDto) {
        storeService.deleteStore(requestDto);
        return ResponseEntity.ok().body("Store delete successfully");
    }

    @GetMapping("/update")
    public ResponseEntity<?> updateStoreGet(@RequestBody StoreUpdateGetRequestDto requestDto) {
        System.out.println(requestDto.getStoreId());
        System.out.println("ㅇㅇㅇㅇㅇ");
        Stores stores = storeService.getUpdateStore(requestDto.getStoreId()).orElseThrow(()
            -> new RuntimeException("Stores not found"));
        StoreUpdateResponseDto responseDto = StoreUpdateResponseDto.builder()
            .name(stores.getName())
            .type(stores.getType())
            .category(stores.getCategory())
            .address(stores.getAddress())
            .storePictureName(stores.getStorePictureName())
            .phone(stores.getPhone())
            .content(stores.getContent())
            .minDeliveryPrice(stores.getMinDeliveryPrice())
            .deliveryTip(stores.getDeliveryTip())
            .minDeliveryTime(stores.getMinDeliveryTime())
            .maxDeliveryTime(stores.getMaxDeliveryTime())
            .operationHours(stores.getOperationHours())
            .closedDays(stores.getClosedDays())
            .deliveryAddress(stores.getDeliveryAddress())
            .build();
        return ResponseEntity.ok().body(responseDto);
    }
}
