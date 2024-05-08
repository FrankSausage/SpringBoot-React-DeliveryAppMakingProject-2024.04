package com.team3.DeliveryProject.service;

import com.team3.DeliveryProject.dto.common.Response;
import com.team3.DeliveryProject.dto.request.menu.MenuAddRequestDto;
import com.team3.DeliveryProject.dto.request.menu.MenuUpdateGetRequestDto;
import com.team3.DeliveryProject.dto.request.menu.MenuUpdatePostRequestDto;
import com.team3.DeliveryProject.dto.request.menuOption.MenuOptionAddRequestDto;
import com.team3.DeliveryProject.dto.response.menu.MenuUpdateGetResponseDto;
import org.springframework.http.ResponseEntity;

public interface MenuService {
    public ResponseEntity<Response> addMenu(MenuAddRequestDto requestDto);

    public ResponseEntity<Response> addMenuOption(MenuOptionAddRequestDto requestDto);
    public ResponseEntity<Response> updateMenu(MenuUpdatePostRequestDto requestDto);
    public MenuUpdateGetResponseDto updateGetMenu(MenuUpdateGetRequestDto requestDto);
}
