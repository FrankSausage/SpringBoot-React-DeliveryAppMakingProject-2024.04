package com.team3.DeliveryProject.controller;

import com.team3.DeliveryProject.dto.request.order.OrderAddRequestDto;
import com.team3.DeliveryProject.dto.request.order.OrderDeleteRequestDto;
import com.team3.DeliveryProject.dto.request.order.OrderDetailRequestDto;
import com.team3.DeliveryProject.dto.request.order.OrderListRequestDto;
import com.team3.DeliveryProject.dto.request.order.OrderOwnerDetailRequestDto;
import com.team3.DeliveryProject.dto.request.order.OrderOwnerListRequestDto;
import com.team3.DeliveryProject.dto.request.order.OrderStatusDetailRequestDto;
import com.team3.DeliveryProject.dto.request.order.OrderUpdateRequestDto;
import com.team3.DeliveryProject.service.OrderService;
import com.team3.DeliveryProject.service.SseEmitterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Controller
@RequestMapping("/order")
public class OrderController {

    @Autowired
    private OrderService orderService;
    @Autowired
    private SseEmitterService sseEmitterService;

    @PostMapping("/register")
    public ResponseEntity<?> addOrder(@RequestBody OrderAddRequestDto requestDto) {
        return ResponseEntity.ok().body(orderService.addOrder(requestDto).getBody());
    }

    @PostMapping("/modify")
    public ResponseEntity<?> updateOrder(@RequestBody OrderUpdateRequestDto requestDto) {
        return ResponseEntity.ok().body(orderService.updateOrder(requestDto).getBody());
    }
    // SSE 엔드포인트 추가
    @GetMapping("/stream/{email}")
    public SseEmitter streamOrderUpdates(@PathVariable String email) {
        return sseEmitterService.createEmitter(email);
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
    @GetMapping("/owner/detail")
    public ResponseEntity<?> detailOwnerOrder(@ModelAttribute OrderOwnerDetailRequestDto requestDto) {
        return ResponseEntity.ok().body(orderService.ownerDetailOrder(requestDto));
    }
    @GetMapping("/detail")
    public ResponseEntity<?> detailOrder(@ModelAttribute OrderDetailRequestDto requestDto) {
        return ResponseEntity.ok().body(orderService.detailOrder(requestDto));
    }
}
