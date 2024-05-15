package com.team3.DeliveryProject.service;

import com.team3.DeliveryProject.dto.common.Response;
import com.team3.DeliveryProject.dto.request.order.OrderAddRequestDto;
import com.team3.DeliveryProject.dto.request.order.OrderUpdateRequestDto;
import org.springframework.http.ResponseEntity;

public interface OrderService {

    public ResponseEntity<Response> addOrder(OrderAddRequestDto requestDto);

    public ResponseEntity<Response> updateOrder(OrderUpdateRequestDto requestDto);
}
