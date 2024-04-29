package com.team3.DeliveryProject.service;

import com.team3.DeliveryProject.dto.common.Response;
import com.team3.DeliveryProject.dto.request.store.StoreAddRequestDto;
import com.team3.DeliveryProject.dto.request.store.StoreDeleteRequestDto;
import com.team3.DeliveryProject.dto.request.store.StoreUpdateRequestDto;
import com.team3.DeliveryProject.entity.Stores;
import java.util.Optional;
import org.springframework.http.ResponseEntity;

public interface StoreService {

    public ResponseEntity<Response> addStore(StoreAddRequestDto requestDto);

    public ResponseEntity<Response> updateStore(StoreUpdateRequestDto requestDto);

    Optional<Stores> getUpdateStore(Long storeId);

    public ResponseEntity<Response> deleteStore(StoreDeleteRequestDto requestDto);
}
