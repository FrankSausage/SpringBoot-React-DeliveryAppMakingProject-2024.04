package com.team3.DeliveryProject.service;

import com.team3.DeliveryProject.dto.common.Response;
import com.team3.DeliveryProject.dto.request.store.StoreAddRequestDto;
import com.team3.DeliveryProject.dto.request.store.StoreDeleteRequestDto;
import com.team3.DeliveryProject.dto.request.store.StoreDetailRequestDto;
import com.team3.DeliveryProject.dto.request.store.StoreListRequestDto;
import com.team3.DeliveryProject.dto.request.store.StoreOwnerListRequestDto;
import com.team3.DeliveryProject.dto.request.store.StoreUpdateRequestDto;
import com.team3.DeliveryProject.dto.response.store.StoreDetailResponseDto;
import com.team3.DeliveryProject.dto.response.store.StoreListInnerResponseDto;
import com.team3.DeliveryProject.dto.response.store.StoreListResponseDto;
import com.team3.DeliveryProject.dto.response.store.StoreOwnerListResponseDto;
import com.team3.DeliveryProject.entity.Stores;
import java.util.List;
import java.util.Optional;
import org.springframework.http.ResponseEntity;
import org.springframework.web.ErrorResponse;

public interface StoreService {

    public ResponseEntity<Response> addStore(StoreAddRequestDto requestDto);

    public ResponseEntity<Response> updateStore(StoreUpdateRequestDto requestDto);

    Optional<Stores> getUpdateStore(Long storeId);

    public ResponseEntity<Response> deleteStore(StoreDeleteRequestDto requestDto);

    StoreListResponseDto getStoreList(StoreListRequestDto requestDto);

    StoreDetailResponseDto getStoreDetail(StoreDetailRequestDto requestDto);

    StoreOwnerListResponseDto getStoreListForOwner(StoreOwnerListRequestDto requestDto);
}
