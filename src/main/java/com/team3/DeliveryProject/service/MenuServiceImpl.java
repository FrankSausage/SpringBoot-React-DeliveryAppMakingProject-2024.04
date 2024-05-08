package com.team3.DeliveryProject.service;

import static com.team3.DeliveryProject.responseCode.ResponseCode.MENUOPTION_ADD_SUCCESS;
import static com.team3.DeliveryProject.responseCode.ResponseCode.MENU_ADD_SUCCESS;
import static com.team3.DeliveryProject.responseCode.ResponseCode.MENU_UPDATE_SUCCESS;

import com.team3.DeliveryProject.dto.common.Response;
import com.team3.DeliveryProject.dto.request.menu.MenuAddRequestDto;
import com.team3.DeliveryProject.dto.request.menu.MenuUpdateGetRequestDto;
import com.team3.DeliveryProject.dto.request.menu.MenuUpdatePostRequestDto;
import com.team3.DeliveryProject.dto.request.menuOption.MenuOptionAddRequestDto;
import com.team3.DeliveryProject.dto.response.menu.MenuUpdateGetResponseDto;
import com.team3.DeliveryProject.dto.response.menu.MenuUpdateInnerMenusResponseDto;
import com.team3.DeliveryProject.dto.response.menu.MenuUpdateInnerOptionsResponseDto;
import com.team3.DeliveryProject.entity.Menu;
import com.team3.DeliveryProject.entity.MenuOption;
import com.team3.DeliveryProject.repository.MenuOptionRepository;
import com.team3.DeliveryProject.repository.MenuRepository;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class MenuServiceImpl implements MenuService{
    private final MenuOptionRepository menuOptionRepository;
    private final MenuRepository menuRepository;
    @Override
    public ResponseEntity<Response> addMenu(MenuAddRequestDto requestDto) {
        Menu menu = new Menu(requestDto.getStoreId(), requestDto.getCategory(), requestDto.getName(),
            requestDto.getContent(), requestDto.getPrice(), requestDto.getMenuPictureName(),
            requestDto.getPopularity(), LocalDateTime.now(), LocalDateTime.now(), "일반");
        menuRepository.save(menu);
        return Response.toResponseEntity(MENU_ADD_SUCCESS);
    }

    @Override
    public ResponseEntity<Response> addMenuOption(MenuOptionAddRequestDto requestDto) {
        MenuOption menuOption = new MenuOption(requestDto.getMenuId(), requestDto.getOptions(),
            requestDto.getPrice(), LocalDateTime.now(), LocalDateTime.now(), "일반");
        System.out.println(menuOption);
        menuOptionRepository.save(menuOption);
        return Response.toResponseEntity(MENUOPTION_ADD_SUCCESS);
    }

    @Override
    public ResponseEntity<Response> updateMenu(MenuUpdatePostRequestDto requestDto) {
        Menu menu = menuRepository.findById(requestDto.getMenuId()).orElseThrow(()->new RuntimeException("Menu not found"));
        menu.setCategory(requestDto.getCategory());
        menu.setName(requestDto.getName());
        menu.setPrice(requestDto.getPrice());
        menu.setMenuPictureName(requestDto.getMenuPictureName());
        menu.setPopularity(requestDto.getPopularity());
        menuRepository.save(menu);
        return Response.toResponseEntity(MENU_UPDATE_SUCCESS);
    }

    @Override
    public MenuUpdateGetResponseDto updateGetMenu(MenuUpdateGetRequestDto requestDto) {
        Menu menu = menuRepository.findById(requestDto.getMenuId()).orElseThrow(()->new RuntimeException("Menu not found"));
        List<MenuOption> menuOptionList = menuOptionRepository.findAllByMenuId(
            requestDto.getMenuId());
        List<MenuUpdateInnerMenusResponseDto> menusResponseDtos = new ArrayList<>();
        List<MenuUpdateInnerOptionsResponseDto> optionsResponseDtos = new ArrayList<>();
        for (MenuOption menuOption : menuOptionList){
            MenuUpdateInnerOptionsResponseDto optionsResponseDto = MenuUpdateInnerOptionsResponseDto.builder()
                .menuOptionId(menuOption.getMenuOptionId())
                .options(menuOption.getOptions())
                .price(menuOption.getPrice())
                .build();
            optionsResponseDtos.add(optionsResponseDto);
        }
        MenuUpdateInnerMenusResponseDto menusResponseDto = MenuUpdateInnerMenusResponseDto.builder()
            .menuId(menu.getMenuId())
            .category(menu.getCategory())
            .name(menu.getName())
            .price(menu.getPrice())
            .menuPictureName(menu.getMenuPictureName())
            .popularity(menu.getPopularity())
            .content(menu.getContent())
            .options(optionsResponseDtos)
            .build();
        menusResponseDtos.add(menusResponseDto);
        MenuUpdateGetResponseDto responseDto = MenuUpdateGetResponseDto.builder()
            .menus(menusResponseDtos)
            .build();
        return responseDto;
    }
}
