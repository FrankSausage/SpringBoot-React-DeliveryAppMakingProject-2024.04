package com.team3.DeliveryProject.service;

import static com.team3.DeliveryProject.responseCode.ErrorCode.USER_POINT_LESS_THAN_INPUT;
import static com.team3.DeliveryProject.responseCode.ResponseCode.CART_ADD_SUCCESS;
import static com.team3.DeliveryProject.responseCode.ResponseCode.ORDER_ADD_SUCCESS;
import static com.team3.DeliveryProject.responseCode.ResponseCode.ORDER_DELETE_SUCCESS;
import static com.team3.DeliveryProject.responseCode.ResponseCode.ORDER_STATUS_DETAIL_SUCCESS;
import static com.team3.DeliveryProject.responseCode.ResponseCode.ORDER_STATUS_UPDATE_SUCCESS;

import com.team3.DeliveryProject.dto.common.Response;
import com.team3.DeliveryProject.dto.request.order.OrderAddInnerMenuOptionsRequestDto;
import com.team3.DeliveryProject.dto.request.order.OrderAddInnerMenusRequestDto;
import com.team3.DeliveryProject.dto.request.order.OrderAddRequestDto;
import com.team3.DeliveryProject.dto.request.order.OrderDeleteRequestDto;
import com.team3.DeliveryProject.dto.request.order.OrderListRequestDto;
import com.team3.DeliveryProject.dto.request.order.OrderStatusDetailRequestDto;
import com.team3.DeliveryProject.dto.request.order.OrderUpdateRequestDto;
import com.team3.DeliveryProject.dto.response.order.OrderListInnerOrdersResponseDto;
import com.team3.DeliveryProject.dto.response.order.OrderListResponseDto;
import com.team3.DeliveryProject.dto.response.order.OrderStatusDetailResponseDto;
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
import java.util.ArrayList;
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
        if((requestDto.getPoint() != 0) && (users.getPoint() >= requestDto.getPoint())){
            users.setPoint(users.getPoint()-requestDto.getPoint());
            usersRepository.save(users);
        } else if ((requestDto.getPoint() == 0)) {
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

    @Override
    public ResponseEntity<Response> deleteOrder(OrderDeleteRequestDto requestDto) {
        Orders orders = ordersRepository.findById(requestDto.getOrderId()).orElseThrow(()->new RuntimeException("Order not found"));
        orders.setStatus("삭제");
        ordersRepository.save(orders);
        return Response.toResponseEntity(ORDER_DELETE_SUCCESS);
    }

    @Override
    public OrderStatusDetailResponseDto statusDetailOrder(OrderStatusDetailRequestDto requestDto) {
        Orders orders = ordersRepository.findById(requestDto.getOrderId()).orElseThrow(()->new RuntimeException("Order not found"));
        OrderStatusDetailResponseDto responseDto = OrderStatusDetailResponseDto.builder()
            .status(orders.getStatus())
            .build();
        return responseDto;
    }

    @Override
    public OrderListResponseDto ownerListOrder(OrderListRequestDto requestDto) {
        List<Orders> ordersList = ordersRepository.findAllByStoreId(requestDto.getStoreId());
        Users users = usersRepository.findUsersByEmail(requestDto.getEmail()).orElseThrow(()->new RuntimeException("User not found"));
        Stores stores = storesRepository.findById(requestDto.getStoreId()).orElseThrow(()->new RuntimeException("Stores not found"));
        List<OrderListInnerOrdersResponseDto> innerOrdersResponseDtoList = new ArrayList<>();
        for(Orders orders : ordersList){
            List<OrderMenu> orderMenus = orderMenuRepository.findAllByOrderId(orders.getOrderId());

            //카운트 계산
            int count = 0;
            int quantity = 0;
            int sequence = 0;
            int tmp = 0;
            for(OrderMenu orderMenu : orderMenus){
                sequence = orderMenu.getSequence();
                quantity = orderMenu.getQuantity();
                if(tmp != sequence){
                    count += quantity;
                    tmp = sequence;
                }
            }

            //상태
            String status = orders.getStatus();
            if(status.equals("삭제")){
                status = "완료";
            }
            OrderMenu orderMenu = orderMenus.get(0);
            String menuName = menuRepository.findById(orderMenu.getMenuId()).get().getName();
            OrderListInnerOrdersResponseDto innerDtos = OrderListInnerOrdersResponseDto.builder()
                .orderId(orders.getOrderId())
                .menuName(menuName)
                .count(count)
                .totalPrice(orders.getTotalPrice())
                .orderDate(orders.getCreatedDate())
                .status(status)
                .build();
            innerOrdersResponseDtoList.add(innerDtos);
        }
        OrderListResponseDto responseDto = OrderListResponseDto.builder()
            .orders(innerOrdersResponseDtoList)
            .build();
        return responseDto;
    }

}
