package com.team3.DeliveryProject.service;

import com.team3.DeliveryProject.dto.common.Response;
import com.team3.DeliveryProject.dto.request.address.AddressAddRequestDto;
import com.team3.DeliveryProject.dto.request.menu.MenuAddRequestDto;
import org.springframework.http.ResponseEntity;

public interface MenuService {
    public ResponseEntity<Response> addMenu(MenuAddRequestDto requestDto);

}
