package com.team3.DeliveryProject.controller;

import com.team3.DeliveryProject.dto.request.menu.MenuAddRequestDto;
import com.team3.DeliveryProject.dto.request.menu.MenuDeleteRequestDto;
import com.team3.DeliveryProject.dto.request.menu.MenuUpdateGetRequestDto;
import com.team3.DeliveryProject.dto.request.menu.MenuUpdatePostRequestDto;
import com.team3.DeliveryProject.dto.request.menu.MenuUpdateStatusRequestDto;
import com.team3.DeliveryProject.dto.request.menuOption.MenuOptionAddRequestDto;
import com.team3.DeliveryProject.dto.request.menuOption.MenuOptionUpdateRequestDto;
import com.team3.DeliveryProject.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/store")
public class MenuController {
    @Autowired
    private MenuService menuService;
    @PostMapping("/menu/register")
    public ResponseEntity<?> addMenu(@RequestBody MenuAddRequestDto requestDto) {
        return ResponseEntity.ok().body(menuService.addMenu(requestDto).getBody());
    }

    @PostMapping("/menuoption/register")
    public ResponseEntity<?> addMenuOption(@RequestBody MenuOptionAddRequestDto requestDto) {
        return ResponseEntity.ok().body(menuService.addMenuOption(requestDto).getBody());
    }
    @GetMapping("/menu/update")
    public ResponseEntity<?> updateMenuOption(@ModelAttribute MenuUpdateGetRequestDto requestDto) {
        return ResponseEntity.ok().body(menuService.updateGetMenu(requestDto));
    }
    @PostMapping("/menu/update")
    public ResponseEntity<?> updateMenu(@RequestBody MenuUpdatePostRequestDto requestDto) {
        return ResponseEntity.ok().body(menuService.updateMenu(requestDto).getBody());
    }
    @PostMapping("/menuoption/update")
    public ResponseEntity<?> updateMenuOption(@RequestBody MenuOptionUpdateRequestDto requestDto) {
        return ResponseEntity.ok().body(menuService.updateMenuOption(requestDto).getBody());
    }
    @PostMapping("/menu/status")
    public ResponseEntity<?> updateMenuStatus(@RequestBody MenuUpdateStatusRequestDto requestDto) {
        return ResponseEntity.ok().body(menuService.updateMenuStatus(requestDto).getBody());
    }
    @PostMapping("/menu/delete")
    public ResponseEntity<?> deleteMenu(@RequestBody MenuDeleteRequestDto requestDto) {
        return ResponseEntity.ok().body(menuService.deleteMenu(requestDto).getBody());
    }


}
