package com.team3.DeliveryProject.controller;

import com.team3.DeliveryProject.dto.request.menu.MenuAddRequestDto;
import com.team3.DeliveryProject.dto.request.store.StoreAddRequestDto;
import com.team3.DeliveryProject.service.MenuService;
import com.team3.DeliveryProject.service.StoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/menu")
public class MenuController {
    @Autowired
    private MenuService menuService;
    @PostMapping("/register")
    public ResponseEntity<?> addMenu(@RequestBody MenuAddRequestDto requestDto) {
        return ResponseEntity.ok().body(menuService.addMenu(requestDto).getBody());
    }

    @PostMapping("/option/register")
    public ResponseEntity<?> addMenuOption(@RequestBody MenuAddRequestDto requestDto) {
        return ResponseEntity.ok().body(menuService.addMenu(requestDto).getBody());
    }

}
