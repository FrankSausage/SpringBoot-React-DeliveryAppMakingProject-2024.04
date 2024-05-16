package com.team3.DeliveryProject.service;

import com.team3.DeliveryProject.dto.common.Response;
import com.team3.DeliveryProject.dto.request.order.OrderAddRequestDto;
import com.team3.DeliveryProject.dto.request.order.OrderDeleteRequestDto;
import com.team3.DeliveryProject.dto.request.order.OrderListRequestDto;
import com.team3.DeliveryProject.dto.request.order.OrderStatusDetailRequestDto;
import com.team3.DeliveryProject.dto.request.order.OrderUpdateRequestDto;
import com.team3.DeliveryProject.dto.response.order.OrderListResponseDto;
import com.team3.DeliveryProject.dto.response.order.OrderStatusDetailResponseDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.ErrorResponse;

public interface OrderService {

    public ResponseEntity<Response> addOrder(OrderAddRequestDto requestDto);

    public ResponseEntity<Response> updateOrder(OrderUpdateRequestDto requestDto);

    public ResponseEntity<Response> deleteOrder(OrderDeleteRequestDto requestDto);
    public OrderStatusDetailResponseDto statusDetailOrder(OrderStatusDetailRequestDto requestDto);

    public OrderListResponseDto ownerListOrder(OrderListRequestDto requestDto);
}
