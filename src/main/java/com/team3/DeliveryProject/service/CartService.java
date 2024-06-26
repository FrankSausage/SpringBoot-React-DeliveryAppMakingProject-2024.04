package com.team3.DeliveryProject.service;

import com.team3.DeliveryProject.dto.common.Response;
import com.team3.DeliveryProject.dto.request.cart.CartAddRequestDto;
import com.team3.DeliveryProject.dto.request.cart.CartDeleteAllRequestDto;
import com.team3.DeliveryProject.dto.request.cart.CartDeleteRequestDto;
import com.team3.DeliveryProject.dto.request.cart.CartDetailRequestDto;
import com.team3.DeliveryProject.dto.request.cart.CartUpdateRequestDto;
import com.team3.DeliveryProject.dto.response.cart.CartDetailResponseDto;
import org.springframework.http.ResponseEntity;

public interface CartService {

    public ResponseEntity<Response> addCart(CartAddRequestDto requestDto);

    public ResponseEntity<Response> deleteAllCart(CartDeleteAllRequestDto requestDto);

    public ResponseEntity<Response> deleteCart(CartDeleteRequestDto requestDto);

    public ResponseEntity<Response> updateCart(CartUpdateRequestDto requestDto);

    public CartDetailResponseDto detailCart(CartDetailRequestDto requestDto);
}
