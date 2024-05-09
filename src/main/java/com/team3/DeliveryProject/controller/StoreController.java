package com.team3.DeliveryProject.controller;

import com.team3.DeliveryProject.dto.request.store.StoreAddRequestDto;
import com.team3.DeliveryProject.dto.request.store.StoreDeleteRequestDto;
import com.team3.DeliveryProject.dto.request.store.StoreDetailRequestDto;
import com.team3.DeliveryProject.dto.request.store.StoreListRequestDto;
import com.team3.DeliveryProject.dto.request.store.StoreOwnerListRequestDto;
import com.team3.DeliveryProject.dto.request.store.StoreUpdateGetRequestDto;
import com.team3.DeliveryProject.dto.request.store.StoreUpdateRequestDto;
import com.team3.DeliveryProject.dto.request.user.UserSignUpRequestDto;
import com.team3.DeliveryProject.dto.response.store.StoreUpdateResponseDto;
import com.team3.DeliveryProject.entity.Stores;
import com.team3.DeliveryProject.entity.Users;
import com.team3.DeliveryProject.repository.StoresRepository;
import com.team3.DeliveryProject.repository.UsersRepository;
import com.team3.DeliveryProject.service.StoreService;
import com.team3.DeliveryProject.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
    @Autowired
    private UsersRepository usersRepository;

    @PostMapping("/owner/register")
    public ResponseEntity<?> addStore(@RequestBody StoreAddRequestDto requestDto) {
        return ResponseEntity.ok().body(storeService.addStore(requestDto).getBody());
    }

    @PostMapping("/owner/update")
    public ResponseEntity<?> updateStore(@RequestBody StoreUpdateRequestDto requestDto) {
        return ResponseEntity.ok().body(storeService.updateStore(requestDto).getBody());
    }
    @PostMapping("/owner/delete")
    public ResponseEntity<?> deleteStore(@RequestBody StoreDeleteRequestDto requestDto) {
        return ResponseEntity.ok().body(storeService.deleteStore(requestDto).getBody());
    }

    @GetMapping("/owner/update")
    public ResponseEntity<?> updateStoreGet(@ModelAttribute StoreUpdateGetRequestDto requestDto) {
        Stores stores = storeService.getUpdateStore(requestDto.getStoreId()).orElseThrow(()
            -> new RuntimeException("Stores not found"));
        if(stores.getUserId() == usersRepository.findUsersByEmail(requestDto.getEmail()).orElseThrow(()->
            new RuntimeException("Users not found")).getUserId()){
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
                .build();
            return ResponseEntity.ok().body(responseDto);
        }else{
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("점주만 가게를 업데이트 할 수 있습니다.");
        }

    }
    @GetMapping("/list/search")
    public ResponseEntity<?> getStoreList(@ModelAttribute StoreListRequestDto requestDto) {
        return ResponseEntity.ok().body(storeService.getStoreList(requestDto));
    }

    @GetMapping("/detail")
    public ResponseEntity<?> getStoreDetail(@ModelAttribute StoreDetailRequestDto requestDto) {
        return ResponseEntity.ok().body(storeService.getStoreDetail(requestDto));
    }

    @GetMapping("/list")
    public ResponseEntity<?> getStoreListForOwner(@ModelAttribute StoreOwnerListRequestDto requestDto) {
        return ResponseEntity.ok().body(storeService.getStoreListForOwner(requestDto));
    }
}