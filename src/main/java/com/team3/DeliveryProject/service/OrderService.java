package com.team3.DeliveryProject.service;

import com.team3.DeliveryProject.dto.common.Response;
import com.team3.DeliveryProject.dto.request.order.OrderAddRequestDto;
import com.team3.DeliveryProject.dto.request.order.OrderDeleteRequestDto;
import com.team3.DeliveryProject.dto.request.order.OrderDetailRequestDto;
import com.team3.DeliveryProject.dto.request.order.OrderListRequestDto;
import com.team3.DeliveryProject.dto.request.order.OrderOwnerDetailRequestDto;
import com.team3.DeliveryProject.dto.request.order.OrderOwnerListRequestDto;
import com.team3.DeliveryProject.dto.request.order.OrderStatusDetailRequestDto;
import com.team3.DeliveryProject.dto.request.order.OrderUpdateRequestDto;
import com.team3.DeliveryProject.dto.response.order.OrderDetailOwnerResponseDto;
import com.team3.DeliveryProject.dto.response.order.OrderDetailResponseDto;
import com.team3.DeliveryProject.dto.response.order.OrderListResponseDto;
import com.team3.DeliveryProject.dto.response.order.OrderOwnerListResponseDto;
import com.team3.DeliveryProject.dto.response.order.OrderStatusDetailResponseDto;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface OrderService {

    public ResponseEntity<Response> addOrder(OrderAddRequestDto requestDto);

    public ResponseEntity<Response> updateOrder(OrderUpdateRequestDto requestDto);

    public ResponseEntity<Response> deleteOrder(OrderDeleteRequestDto requestDto);

    public OrderStatusDetailResponseDto statusDetailOrder(OrderStatusDetailRequestDto requestDto);

    public OrderOwnerListResponseDto ownerListOrder(OrderOwnerListRequestDto requestDto);

    public OrderListResponseDto listOrder(OrderListRequestDto requestDto);

    public OrderDetailOwnerResponseDto ownerDetailOrder(OrderOwnerDetailRequestDto requestDto);

    public OrderDetailResponseDto detailOrder(OrderDetailRequestDto requestDto);
}
