package com.team3.DeliveryProject.service;

import static com.team3.DeliveryProject.responseCode.ResponseCode.ADDRESS_ADD_SUCCESS;
import static com.team3.DeliveryProject.responseCode.ResponseCode.MENU_ADD_SUCCESS;

import com.team3.DeliveryProject.dto.common.Response;
import com.team3.DeliveryProject.dto.request.address.AddressAddRequestDto;
import com.team3.DeliveryProject.dto.request.menu.MenuAddRequestDto;
import com.team3.DeliveryProject.entity.Menu;
import com.team3.DeliveryProject.repository.AddressRepository;
import com.team3.DeliveryProject.repository.MenuRepository;
import com.team3.DeliveryProject.repository.UsersRepository;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class MenuServiceImpl implements MenuService{
    private final UsersRepository usersRepository;
    private final MenuRepository menuRepository;
    @Override
    public ResponseEntity<Response> addMenu(MenuAddRequestDto requestDto) {
        Menu menu = new Menu(requestDto.getStoreId(), requestDto.getCategory(), requestDto.getName(),
            requestDto.getContent(), requestDto.getPrice(), requestDto.getMenuPictureName(),
            requestDto.getPopularity(), LocalDateTime.now(), LocalDateTime.now(), "일반");
        menuRepository.save(menu);
        return Response.toResponseEntity(MENU_ADD_SUCCESS);
    }
}
