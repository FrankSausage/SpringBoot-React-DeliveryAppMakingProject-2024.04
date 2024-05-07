package com.team3.DeliveryProject.service;

import com.team3.DeliveryProject.dto.common.Response;
import com.team3.DeliveryProject.dto.request.address.AddressAddRequestDto;
import com.team3.DeliveryProject.dto.request.menu.MenuAddRequestDto;
import com.team3.DeliveryProject.dto.request.menuOption.MenuOptionAddRequestDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.ErrorResponse;

public interface MenuService {
    public ResponseEntity<Response> addMenu(MenuAddRequestDto requestDto);

    public ResponseEntity<Response> addMenuOption(MenuOptionAddRequestDto requestDto);}
