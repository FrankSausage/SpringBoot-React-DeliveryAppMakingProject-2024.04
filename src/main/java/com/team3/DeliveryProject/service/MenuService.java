package com.team3.DeliveryProject.service;

import com.team3.DeliveryProject.dto.common.Response;
import com.team3.DeliveryProject.dto.request.menu.MenuAddRequestDto;
import com.team3.DeliveryProject.dto.request.menu.MenuDeleteRequestDto;
import com.team3.DeliveryProject.dto.request.menu.MenuDetailRequestDto;
import com.team3.DeliveryProject.dto.request.menu.MenuListGetRequestDto;
import com.team3.DeliveryProject.dto.request.menu.MenuUpdateGetRequestDto;
import com.team3.DeliveryProject.dto.request.menu.MenuUpdatePostRequestDto;
import com.team3.DeliveryProject.dto.request.menu.MenuUpdateStatusRequestDto;
import com.team3.DeliveryProject.dto.request.menuOption.MenuOptionAddRequestDto;
import com.team3.DeliveryProject.dto.request.menuOption.MenuOptionDeleteRequestDto;
import com.team3.DeliveryProject.dto.request.menuOption.MenuOptionUpdateRequestDto;
import com.team3.DeliveryProject.dto.response.menu.MenuDetailResponseDto;
import com.team3.DeliveryProject.dto.response.menu.MenuListGetResponseDto;
import com.team3.DeliveryProject.dto.response.menu.MenuUpdateGetResponseDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.ErrorResponse;

public interface MenuService {
    public ResponseEntity<Response> addMenu(MenuAddRequestDto requestDto);
    public ResponseEntity<Response> addMenuOption(MenuOptionAddRequestDto requestDto);
    public ResponseEntity<Response> updateMenu(MenuUpdatePostRequestDto requestDto);
    public MenuUpdateGetResponseDto updateGetMenu(MenuUpdateGetRequestDto requestDto);
    public ResponseEntity<Response> updateMenuOption(MenuOptionUpdateRequestDto requestDto);
    public ResponseEntity<Response> updateMenuStatus(MenuUpdateStatusRequestDto requestDto);
    public ResponseEntity<Response> deleteMenu(MenuDeleteRequestDto requestDto);
    public ResponseEntity<Response> deleteMenuOption(MenuOptionDeleteRequestDto requestDto);
    public MenuListGetResponseDto getMenuList(MenuListGetRequestDto requestDto);
    public MenuDetailResponseDto getMenuDetail(MenuDetailRequestDto requestDto);
}
