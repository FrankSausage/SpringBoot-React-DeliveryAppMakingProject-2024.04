package com.team3.DeliveryProject.service;

import com.team3.DeliveryProject.dto.common.Response;
import com.team3.DeliveryProject.dto.request.address.AddressAddRequestDto;
import com.team3.DeliveryProject.dto.request.cart.CartAddRequestDto;
import com.team3.DeliveryProject.dto.request.cart.CartDeleteAllRequestDto;
import com.team3.DeliveryProject.dto.request.cart.CartDeleteRequestDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.ErrorResponse;

public interface CartService {
    public ResponseEntity<Response> addCart(CartAddRequestDto requestDto);

    public ResponseEntity<Response> deleteAllCart(CartDeleteAllRequestDto requestDto);

    public ResponseEntity<Response> deleteCart(CartDeleteRequestDto requestDto);
}
