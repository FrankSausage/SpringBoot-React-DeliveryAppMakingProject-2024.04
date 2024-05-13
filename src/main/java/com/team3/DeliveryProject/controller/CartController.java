package com.team3.DeliveryProject.controller;

import com.team3.DeliveryProject.dto.request.cart.CartAddRequestDto;
import com.team3.DeliveryProject.dto.request.cart.CartDeleteAllRequestDto;
import com.team3.DeliveryProject.dto.request.menu.MenuListGetRequestDto;
import com.team3.DeliveryProject.dto.request.menuOption.MenuOptionDeleteRequestDto;
import com.team3.DeliveryProject.service.AddressService;
import com.team3.DeliveryProject.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService cartService;
    @PostMapping("/register")
    public ResponseEntity<?> addCart(@RequestBody CartAddRequestDto requestDto) {
        return ResponseEntity.ok().body(cartService.addCart(requestDto).getBody());
    }

    @PostMapping("/deleteall")
    public ResponseEntity<?> deleteAllCart(@RequestBody CartDeleteAllRequestDto requestDto) {
        return ResponseEntity.ok().body(cartService.deleteAllCart(requestDto).getBody());
    }
}
