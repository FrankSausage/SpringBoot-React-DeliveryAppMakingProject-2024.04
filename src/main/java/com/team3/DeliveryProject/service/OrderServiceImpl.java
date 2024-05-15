package com.team3.DeliveryProject.service;

import static com.team3.DeliveryProject.responseCode.ErrorCode.USER_POINT_LESS_THAN_INPUT;
import static com.team3.DeliveryProject.responseCode.ResponseCode.CART_ADD_SUCCESS;
import static com.team3.DeliveryProject.responseCode.ResponseCode.ORDER_ADD_SUCCESS;
import static com.team3.DeliveryProject.responseCode.ResponseCode.ORDER_STATUS_UPDATE_SUCCESS;

import com.team3.DeliveryProject.dto.common.Response;
import com.team3.DeliveryProject.dto.request.order.OrderAddInnerMenuOptionsRequestDto;
import com.team3.DeliveryProject.dto.request.order.OrderAddInnerMenusRequestDto;
import com.team3.DeliveryProject.dto.request.order.OrderAddRequestDto;
import com.team3.DeliveryProject.dto.request.order.OrderUpdateRequestDto;
import com.team3.DeliveryProject.entity.Menu;
import com.team3.DeliveryProject.entity.MenuOption;
import com.team3.DeliveryProject.entity.OrderMenu;
import com.team3.DeliveryProject.entity.Orders;
import com.team3.DeliveryProject.entity.Stores;
import com.team3.DeliveryProject.entity.Users;
import com.team3.DeliveryProject.repository.MenuOptionRepository;
import com.team3.DeliveryProject.repository.MenuRepository;
import com.team3.DeliveryProject.repository.OrderMenuRepository;
import com.team3.DeliveryProject.repository.OrdersRepository;
import com.team3.DeliveryProject.repository.StoresRepository;
import com.team3.DeliveryProject.repository.UsersRepository;
import com.team3.DeliveryProject.responseCode.ErrorCode;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class OrderServiceImpl implements OrderService{

    private final StoresRepository storesRepository;
    private final UsersRepository usersRepository;
    private final OrdersRepository ordersRepository;
    private final MenuRepository menuRepository;
    private final MenuOptionRepository menuOptionRepository;
    private final OrderMenuRepository orderMenuRepository;

    @Override
    public ResponseEntity<Response> addOrder(OrderAddRequestDto requestDto) {
        Stores stores = storesRepository.findById(requestDto.getStoreId()).orElseThrow(()->
            new RuntimeException("Store not found"));
        Users users = usersRepository.findUsersByEmail(requestDto.getUserEmail()).orElseThrow(()->
            new RuntimeException("User not found"));
        Users deliveryUsers = usersRepository.findUsersByEmail(requestDto.getDeliveryUserEmail()).orElseThrow(()->
            new RuntimeException("DeliveryUser not found"));

        //포인트 로직
        if((requestDto.getPoint() != 0) && (users.getPoint() > requestDto.getPoint())){
            users.setPoint(users.getPoint()-requestDto.getPoint());
            usersRepository.save(users);
        } else if ((requestDto.getPoint() == 0) && (users.getPoint() > requestDto.getPoint())) {
            int grade = users.getGrade();
            users.setPoint(users.getPoint() + (requestDto.getTotalPrice() * grade / 100));
        }else {
            return Response.toResponseEntity(USER_POINT_LESS_THAN_INPUT);
        }

        //주문 테이블 저장
        Orders orders = new Orders(stores.getStoreId(), users.getUserId(),
            deliveryUsers.getUserId(), requestDto.getPaymentMethod(), requestDto.getPoint(), requestDto.getTotalPrice(),
            requestDto.getRequests(), LocalDateTime.now(), LocalDateTime.now(), "접수대기", requestDto.getAddress());

        Long orderId = ordersRepository.save(orders).getOrderId();


        //메뉴, 메뉴옵션 저장 로직
        List<OrderAddInnerMenusRequestDto> menuList = requestDto.getMenus();
        for (OrderAddInnerMenusRequestDto menusRequestDto : menuList){
            Menu menu = menuRepository.findById(menusRequestDto.getMenuId()).orElseThrow(()->new RuntimeException("Menu not found"));
            for(OrderAddInnerMenuOptionsRequestDto menuOptionsRequestDto : menusRequestDto.getMenuOptions()){
                MenuOption menuOption = menuOptionRepository.findById(
                    menuOptionsRequestDto.getMenuOptionId()).orElseThrow(()->new RuntimeException("MenuOption not found"));
                OrderMenu orderMenu = new OrderMenu(orderId, menuOption.getMenuOptionId(),
                    menu.getMenuId(), menusRequestDto.getSequence(), menusRequestDto.getQuantity());
                orderMenuRepository.save(orderMenu);
            }
        }

        return Response.toResponseEntity(ORDER_ADD_SUCCESS);
    }

    @Override
    public ResponseEntity<Response> updateOrder(OrderUpdateRequestDto requestDto) {
        // 주문 로직
        Orders orders = ordersRepository.findById(requestDto.getOrderId()).orElseThrow(()->new RuntimeException("Order not found"));
        orders.setStatus(requestDto.getStatus());
        ordersRepository.save(orders);

        //포인트 로직 (삭제되어도 완료된 애들이니 완료, 삭제인경우를 샘)
        Users users = usersRepository.findById(orders.getOrderUserId()).orElseThrow(()->new RuntimeException("User not found"));

        LocalDateTime startOfMonth = LocalDateTime.now().withDayOfMonth(1).withHour(0).withMinute(0).withSecond(0);
        LocalDateTime endOfMonth = startOfMonth.plusMonths(1).minusSeconds(1);

        long deletedOrCompletedOrderCount = ordersRepository.countByModifiedDateBetweenAndStatusIn(startOfMonth, endOfMonth, Arrays.asList("삭제", "완료"));

        if (deletedOrCompletedOrderCount % 5 == 0) {
            int currentGrade = users.getGrade();
            users.setGrade(currentGrade + 1);
            usersRepository.save(users);
        }

        return Response.toResponseEntity(ORDER_STATUS_UPDATE_SUCCESS);
    }
}
