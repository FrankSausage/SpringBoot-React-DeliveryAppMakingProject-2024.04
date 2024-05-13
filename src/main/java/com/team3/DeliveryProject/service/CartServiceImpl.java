package com.team3.DeliveryProject.service;

import static com.team3.DeliveryProject.responseCode.ResponseCode.CART_ADD_SUCCESS;
import static com.team3.DeliveryProject.responseCode.ResponseCode.CART_DELETE_ALL_SUCCESS;
import static com.team3.DeliveryProject.responseCode.ResponseCode.CART_DELETE_SUCCESS;
import static com.team3.DeliveryProject.responseCode.ResponseCode.CART_UPDATE_SUCCESS;

import com.team3.DeliveryProject.dto.common.Response;
import com.team3.DeliveryProject.dto.request.cart.CartAddInnerMenuOptionsRequestDto;
import com.team3.DeliveryProject.dto.request.cart.CartAddInnerMenusRequestDto;
import com.team3.DeliveryProject.dto.request.cart.CartAddRequestDto;
import com.team3.DeliveryProject.dto.request.cart.CartDeleteAllRequestDto;
import com.team3.DeliveryProject.dto.request.cart.CartDeleteRequestDto;
import com.team3.DeliveryProject.dto.request.cart.CartDetailRequestDto;
import com.team3.DeliveryProject.dto.request.cart.CartUpdateRequestDto;
import com.team3.DeliveryProject.dto.response.cart.CartDetailInnerMenuOptionsResponseDto;
import com.team3.DeliveryProject.dto.response.cart.CartDetailInnerMenusResponseDto;
import com.team3.DeliveryProject.dto.response.cart.CartDetailResponseDto;
import com.team3.DeliveryProject.entity.Cart;
import com.team3.DeliveryProject.entity.Menu;
import com.team3.DeliveryProject.entity.MenuOption;
import com.team3.DeliveryProject.entity.Users;
import com.team3.DeliveryProject.repository.CartRepository;
import com.team3.DeliveryProject.repository.MenuOptionRepository;
import com.team3.DeliveryProject.repository.MenuRepository;
import com.team3.DeliveryProject.repository.StoresRepository;
import com.team3.DeliveryProject.repository.UsersRepository;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final MenuRepository menuRepository;
    private final MenuOptionRepository menuOptionRepository;
    private final StoresRepository storesRepository;
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
                Cart cart = new Cart(users.getUserId(), menuId, menuOptionId, storeId, sequence,
                    quantity, "일반");
                carts.add(cart);
            }
        }
        for (Cart cart : carts) {
            cartRepository.save(cart);
        }
        return Response.toResponseEntity(CART_ADD_SUCCESS);
    }


    @Override
    public ResponseEntity<Response> deleteAllCart(CartDeleteAllRequestDto requestDto) {
        Users users = usersRepository.findUsersByEmail(requestDto.getEmail())
            .orElseThrow(() -> new RuntimeException("User not found"));
        List<Cart> cartList = cartRepository.findAllByUserId(users.getUserId());
        for (Cart cart : cartList) {
            cart.setStatus("삭제");
            cartRepository.save(cart);
        }
        return Response.toResponseEntity(CART_DELETE_ALL_SUCCESS);
    }

    @Override
    public ResponseEntity<Response> deleteCart(CartDeleteRequestDto requestDto) {
        Users users = usersRepository.findUsersByEmail(requestDto.getEmail())
            .orElseThrow(() -> new RuntimeException("User not found"));
        List<Cart> cartList = cartRepository.findAllByUserIdAndSequenceAndStatus(users.getUserId(),
            requestDto.getSequence(), "일반");
        for (Cart cart : cartList) {
            cart.setStatus("삭제");
            cartRepository.save(cart);
        }
        return Response.toResponseEntity(CART_DELETE_SUCCESS);
    }

    @Override
    public ResponseEntity<Response> updateCart(CartUpdateRequestDto requestDto) {
        Users users = usersRepository.findUsersByEmail(requestDto.getEmail())
            .orElseThrow(() -> new RuntimeException("User not found"));
        List<Cart> cartList = cartRepository.findAllByUserIdAndSequenceAndStatus(users.getUserId(),
            requestDto.getSequence(), "일반");
        for (Cart cart : cartList) {
            cart.setQuantity(requestDto.getQuantity());
            cartRepository.save(cart);
        }
        return Response.toResponseEntity(CART_UPDATE_SUCCESS);
    }

    //    @Override
//    public CartDetailResponseDto detailCart(CartDetailRequestDto requestDto) {
//        Users users = usersRepository.findUsersByEmail(requestDto.getEmail()).orElseThrow(()->new RuntimeException("User not found"));
//        List<Cart> cartList = cartRepository.findAllByUserIdAndStatus(users.getUserId(), "일반");
//
//        List<CartDetailInnerMenusResponseDto> menusResponseDtos = new ArrayList<>();
//        CartDetailResponseDto responseDto = new CartDetailResponseDto();
//        for(Cart cart : cartList){
//            int sequence = cart.getSequence();
//            List<CartDetailInnerMenuOptionsResponseDto> menuOptionsResponseDtos = new ArrayList<>();
//            MenuOption menuOption = menuOptionRepository.findById(cart.getMenuOptionId()).orElseThrow(()->new RuntimeException("MenuOption not found"));
//            Menu menu = menuRepository.findById(cart.getMenuId()).orElseThrow(()->new RuntimeException("Menu not found"));
//            Stores stores = storesRepository.findById(cart.getStoreId()).orElseThrow(()->new RuntimeException("Store not found"));
//
//            for(int i = 1; i <cart.getSequence();i++){
//
//            }
//            CartDetailInnerMenuOptionsResponseDto cartDetailInnerMenuOptionsResponseDto = CartDetailInnerMenuOptionsResponseDto.builder()
//                .menuOptionName(menuOption.getOptions())
//                .menuOptionPrice(menuOption.getPrice())
//                .build();
//            menuOptionsResponseDtos.add(cartDetailInnerMenuOptionsResponseDto);
//
//            CartDetailInnerMenusResponseDto cartDetailInnerMenusResponseDto = CartDetailInnerMenusResponseDto.builder()
//                .menuName(menu.getName())
//                .menuPrice(menu.getPrice())
//                .quantity(cart.getQuantity())
//                .sequence(cart.getSequence())
//                .menuPictureName(menu.getMenuPictureName())
//                .menuOptions(menuOptionsResponseDtos)
//                .build();
//        }
//        return responseDto;
//    }
    @Override
    public CartDetailResponseDto detailCart(CartDetailRequestDto requestDto) {
        Users users = usersRepository.findUsersByEmail(requestDto.getEmail())
            .orElseThrow(() -> new RuntimeException("User not found"));
        List<Cart> cartList = cartRepository.findAllByUserIdAndStatus(users.getUserId(), "일반");
        Long storeId = cartList.get(0).getStoreId();
        String storeName = storesRepository.findById(storeId)
            .orElseThrow(() -> new RuntimeException("Store not found")).getName();
        List<CartDetailInnerMenusResponseDto> menusResponseDtos = new ArrayList<>();
        CartDetailResponseDto responseDto = new CartDetailResponseDto(storeId, storeName);
        List<CartDetailInnerMenuOptionsResponseDto> menuOptionsResponseDtos = new ArrayList<>();

        for (int i = 0; i < cartList.size(); i++) {
            Cart cart = cartList.get(i);
            MenuOption menuOption = menuOptionRepository.findById(cart.getMenuOptionId())
                .orElseThrow(() -> new RuntimeException("MenuOption not found"));
            System.out.println("menuOption ========================== ");
            System.out.println(menuOption);
            Menu menu = menuRepository.findById(cart.getMenuId())
                .orElseThrow(() -> new RuntimeException("Menu not found"));

            String menuOptionName = menuOption.getOptions();
            int menuOptionPrice = menuOption.getPrice();

            CartDetailInnerMenuOptionsResponseDto cartDetailInnerMenuOptionsResponseDto = CartDetailInnerMenuOptionsResponseDto.builder()
                .menuOptionName(menuOptionName)
                .menuOptionPrice(menuOptionPrice)
                .build();
            System.out.println("cartDetailInnerMenuOptionsResponseDto =================== ");
            System.out.println(cartDetailInnerMenuOptionsResponseDto);
            menuOptionsResponseDtos.add(cartDetailInnerMenuOptionsResponseDto);

            if (i + 1 < cartList.size() && cart.getSequence() == cartList.get(i + 1)
                .getSequence()) {
                continue;
            }
            CartDetailInnerMenusResponseDto cartDetailInnerMenusResponseDto = CartDetailInnerMenusResponseDto.builder()
                .menuName(menu.getName())
                .menuPrice(menu.getPrice())
                .quantity(cart.getQuantity())
                .sequence(cart.getSequence())
                .menuPictureName(menu.getMenuPictureName())
                .menuOptions(new ArrayList<>(menuOptionsResponseDtos))
                .build();

            menusResponseDtos.add(cartDetailInnerMenusResponseDto);
            menuOptionsResponseDtos.clear();

        }
        responseDto.setMenus(menusResponseDtos);
        return responseDto;
    }

}
