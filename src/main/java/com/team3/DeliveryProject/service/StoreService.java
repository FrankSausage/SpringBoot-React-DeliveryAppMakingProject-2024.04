package com.team3.DeliveryProject.service;

import com.team3.DeliveryProject.dto.common.Response;
import com.team3.DeliveryProject.dto.request.store.StoreAddRequestDto;
import com.team3.DeliveryProject.entity.Stores;
import org.springframework.http.ResponseEntity;

public interface StoreService {

    public ResponseEntity<Response> addStore(StoreAddRequestDto requestDto);
}
