package com.team3.DeliveryProject.service;

import static com.team3.DeliveryProject.responseCode.ResponseCode.CART_ADD_SUCCESS;
import static com.team3.DeliveryProject.responseCode.ResponseCode.MENUOPTION_DELETE_SUCCESS;

import com.team3.DeliveryProject.dto.common.Response;
import com.team3.DeliveryProject.dto.request.cart.CartAddInnerMenuOptionsRequestDto;
import com.team3.DeliveryProject.dto.request.cart.CartAddInnerMenusRequestDto;
import com.team3.DeliveryProject.dto.request.cart.CartAddRequestDto;
import com.team3.DeliveryProject.entity.Cart;
import com.team3.DeliveryProject.entity.Users;
import com.team3.DeliveryProject.repository.CartRepository;
import com.team3.DeliveryProject.repository.UsersRepository;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class CartServiceImpl implements CartService{
    private final CartRepository cartRepository;
    private final UsersRepository usersRepository;
    @Override
    public ResponseEntity<Response> addCart(CartAddRequestDto requestDto) {
        Users users = usersRepository.findUsersByEmail(requestDto.getEmail())
            .orElseThrow(() -> new RuntimeException("User not found"));
        Long storeId = requestDto.getStoreId();
        List<CartAddInnerMenusRequestDto> menus = requestDto.getMenus();
        List<Cart> carts = new ArrayList<>();

        for (CartAddInnerMenusRequestDto menu : menus) {
            Long menuId = menu.getMenuId();
            int sequence = menu.getSequence();
            int quantity = menu.getQuantity();
            List<CartAddInnerMenuOptionsRequestDto> menuOptions = menu.getMenuOptions();

            for (CartAddInnerMenuOptionsRequestDto menuOption : menuOptions) {
                Long menuOptionId = menuOption.getMenuOptionId();
                Cart cart = new Cart(users.getUserId(), menuId, menuOptionId, storeId, sequence, quantity);
                carts.add(cart);
            }
        }
        for (Cart cart : carts){
            cartRepository.save(cart);
        }
        return Response.toResponseEntity(CART_ADD_SUCCESS);
    }


}
