package com.team3.DeliveryProject.controller;

import com.team3.DeliveryProject.dto.request.order.OrderAddRequestDto;
import com.team3.DeliveryProject.dto.request.order.OrderDeleteRequestDto;
import com.team3.DeliveryProject.dto.request.order.OrderListRequestDto;
import com.team3.DeliveryProject.dto.request.order.OrderOwnerListRequestDto;
import com.team3.DeliveryProject.dto.request.order.OrderStatusDetailRequestDto;
import com.team3.DeliveryProject.dto.request.order.OrderUpdateRequestDto;
import com.team3.DeliveryProject.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/register")
    public ResponseEntity<?> addOrder(@RequestBody OrderAddRequestDto requestDto) {
        return ResponseEntity.ok().body(orderService.addOrder(requestDto).getBody());
    }

    @PostMapping("/modify")
    public ResponseEntity<?> updateOrder(@RequestBody OrderUpdateRequestDto requestDto) {
        return ResponseEntity.ok().body(orderService.updateOrder(requestDto).getBody());
    }

    @PostMapping("/delete")
    public ResponseEntity<?> updateOrder(@RequestBody OrderDeleteRequestDto requestDto) {
        return ResponseEntity.ok().body(orderService.deleteOrder(requestDto).getBody());
    }

    @GetMapping("/status/detail")
    public ResponseEntity<?> updateOrder(@ModelAttribute OrderStatusDetailRequestDto requestDto) {
        return ResponseEntity.ok().body(orderService.statusDetailOrder(requestDto));
    }

    @GetMapping("/owner/list")
    public ResponseEntity<?> listOwnerOrder(@ModelAttribute OrderOwnerListRequestDto requestDto) {
        return ResponseEntity.ok().body(orderService.ownerListOrder(requestDto));
    }

    @GetMapping("/list")
    public ResponseEntity<?> listOwnerOrder(@ModelAttribute OrderListRequestDto requestDto) {
        return ResponseEntity.ok().body(orderService.listOrder(requestDto));
    }

}
