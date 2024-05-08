package com.team3.DeliveryProject.service;

import static com.team3.DeliveryProject.responseCode.ResponseCode.MENUOPTION_ADD_SUCCESS;
import static com.team3.DeliveryProject.responseCode.ResponseCode.MENUOPTION_DELETE_SUCCESS;
import static com.team3.DeliveryProject.responseCode.ResponseCode.MENUOPTION_UPDATE_SUCCESS;
import static com.team3.DeliveryProject.responseCode.ResponseCode.MENUSTATUS_UPDATE_SUCCESS;
import static com.team3.DeliveryProject.responseCode.ResponseCode.MENU_ADD_SUCCESS;
import static com.team3.DeliveryProject.responseCode.ResponseCode.MENU_DELETE_SUCCESS;
import static com.team3.DeliveryProject.responseCode.ResponseCode.MENU_UPDATE_SUCCESS;

import com.team3.DeliveryProject.dto.common.Response;
import com.team3.DeliveryProject.dto.request.menu.MenuAddRequestDto;
import com.team3.DeliveryProject.dto.request.menu.MenuDeleteRequestDto;
import com.team3.DeliveryProject.dto.request.menu.MenuListGetRequestDto;
import com.team3.DeliveryProject.dto.request.menu.MenuUpdateGetRequestDto;
import com.team3.DeliveryProject.dto.request.menu.MenuUpdatePostRequestDto;
import com.team3.DeliveryProject.dto.request.menu.MenuUpdateStatusRequestDto;
import com.team3.DeliveryProject.dto.request.menuOption.MenuOptionAddRequestDto;
import com.team3.DeliveryProject.dto.request.menuOption.MenuOptionDeleteRequestDto;
import com.team3.DeliveryProject.dto.request.menuOption.MenuOptionUpdateRequestDto;
import com.team3.DeliveryProject.dto.response.address.AddressFindAllResponseDto;
import com.team3.DeliveryProject.dto.response.menu.MenuListGetInnerCategoriesResponseDto;
import com.team3.DeliveryProject.dto.response.menu.MenuListGetInnerMenusResponseDto;
import com.team3.DeliveryProject.dto.response.menu.MenuListGetResponseDto;
import com.team3.DeliveryProject.dto.response.menu.MenuUpdateGetResponseDto;
import com.team3.DeliveryProject.dto.response.menu.MenuUpdateInnerMenusResponseDto;
import com.team3.DeliveryProject.dto.response.menu.MenuUpdateInnerOptionsResponseDto;
import com.team3.DeliveryProject.entity.Address;
import com.team3.DeliveryProject.entity.Menu;
import com.team3.DeliveryProject.entity.MenuOption;
import com.team3.DeliveryProject.entity.Users;
import com.team3.DeliveryProject.repository.MenuOptionRepository;
import com.team3.DeliveryProject.repository.MenuRepository;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
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
        menu.setContent(requestDto.getContent());
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

    @Override
    public ResponseEntity<Response> updateMenuOption(MenuOptionUpdateRequestDto requestDto) {
        MenuOption menuOption = menuOptionRepository.findById(requestDto.getMenuOptionId()).orElseThrow(()->new RuntimeException("MenuOption not found"));
        menuOption.setOptions(requestDto.getOptions());
        menuOption.setPrice(requestDto.getPrice());
        menuOptionRepository.save(menuOption);
        return Response.toResponseEntity(MENUOPTION_UPDATE_SUCCESS);
    }

    @Override
    public ResponseEntity<Response> updateMenuStatus(MenuUpdateStatusRequestDto requestDto) {
        Menu menu = menuRepository.findById(requestDto.getMenuId()).orElseThrow(()->new RuntimeException("Menu not found"));
        menu.setStatus(requestDto.getStatus());
        menuRepository.save(menu);
        return Response.toResponseEntity(MENUSTATUS_UPDATE_SUCCESS);
    }

    @Override
    public ResponseEntity<Response> deleteMenu(MenuDeleteRequestDto requestDto) {
        Menu menu = menuRepository.findById(requestDto.getMenuId()).orElseThrow(()->new RuntimeException("Menu not found"));
        menu.setStatus("삭제");
        menuRepository.save(menu);
        return Response.toResponseEntity(MENU_DELETE_SUCCESS);
    }

    @Override
    public ResponseEntity<Response> deleteMenuOption(MenuOptionDeleteRequestDto requestDto) {
        MenuOption menuOption = menuOptionRepository.findById(requestDto.getMenuOptionId()).orElseThrow(()->new RuntimeException("MenuOption not found"));
        menuOption.setStatus("삭제");
        menuOptionRepository.save(menuOption);
        return Response.toResponseEntity(MENUOPTION_DELETE_SUCCESS);
    }

    @Override
    public MenuListGetResponseDto getMenuList(MenuListGetRequestDto requestDto) {
        MenuListGetResponseDto responseDto = new MenuListGetResponseDto();
        List<Menu> menuList = menuRepository.findAllByStoreId(requestDto.getStoreId());

        // 메뉴를 카테고리별로 그룹화
        Map<String, List<Menu>> groupedByCategory = menuList.stream()
            .filter(menu -> !menu.getStatus().equals("삭제"))
            .collect(Collectors.groupingBy(Menu::getCategory));

        List<MenuListGetInnerCategoriesResponseDto> categoriesResponseDtos = new ArrayList<>();

        // 각 카테고리별로 DTO 생성
        for (Map.Entry<String, List<Menu>> entry : groupedByCategory.entrySet()) {
            String category = entry.getKey();
            List<MenuListGetInnerMenusResponseDto> menusResponseDtos = entry.getValue().stream()
                .map(MenuListGetInnerMenusResponseDto::new)
                .collect(Collectors.toList());

            MenuListGetInnerCategoriesResponseDto categoriesResponseDto = new MenuListGetInnerCategoriesResponseDto();
            categoriesResponseDto.setCategory(category);
            categoriesResponseDto.setMenus(menusResponseDtos);
            categoriesResponseDtos.add(categoriesResponseDto);
        }

        // 전체 응답 DTO에 카테고리 DTO 리스트 설정
        responseDto.setCategories(categoriesResponseDtos);

        return responseDto;
    }

}
