package com.team3.DeliveryProject.service;

import com.team3.DeliveryProject.dto.common.Response;
import com.team3.DeliveryProject.dto.request.order.OrderAddRequestDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.ErrorResponse;

public interface OrderService {

    public ResponseEntity<Response> addOrder(OrderAddRequestDto requestDto);
}
