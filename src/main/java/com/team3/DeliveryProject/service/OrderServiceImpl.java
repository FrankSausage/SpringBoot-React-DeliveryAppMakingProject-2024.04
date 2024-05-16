package com.team3.DeliveryProject.service;

import static com.team3.DeliveryProject.responseCode.ErrorCode.USER_POINT_LESS_THAN_INPUT;
import static com.team3.DeliveryProject.responseCode.ResponseCode.ORDER_ADD_SUCCESS;
import static com.team3.DeliveryProject.responseCode.ResponseCode.ORDER_DELETE_SUCCESS;
import static com.team3.DeliveryProject.responseCode.ResponseCode.ORDER_STATUS_UPDATE_SUCCESS;

import com.team3.DeliveryProject.dto.common.Response;
import com.team3.DeliveryProject.dto.request.order.OrderAddInnerMenuOptionsRequestDto;
import com.team3.DeliveryProject.dto.request.order.OrderAddInnerMenusRequestDto;
import com.team3.DeliveryProject.dto.request.order.OrderAddRequestDto;
import com.team3.DeliveryProject.dto.request.order.OrderDeleteRequestDto;
import com.team3.DeliveryProject.dto.request.order.OrderListRequestDto;
import com.team3.DeliveryProject.dto.request.order.OrderOwnerDetailRequestDto;
import com.team3.DeliveryProject.dto.request.order.OrderOwnerListRequestDto;
import com.team3.DeliveryProject.dto.request.order.OrderStatusDetailRequestDto;
import com.team3.DeliveryProject.dto.request.order.OrderUpdateRequestDto;
import com.team3.DeliveryProject.dto.response.order.OrderDetailOwnerInnerMenuOptionsResponseDto;
import com.team3.DeliveryProject.dto.response.order.OrderDetailOwnerInnerMenusResponseDto;
import com.team3.DeliveryProject.dto.response.order.OrderDetailOwnerResponseDto;
import com.team3.DeliveryProject.dto.response.order.OrderListInnerOrdersResponseDto;
import com.team3.DeliveryProject.dto.response.order.OrderListResponseDto;
import com.team3.DeliveryProject.dto.response.order.OrderOwnerListInnerOrdersResponseDto;
import com.team3.DeliveryProject.dto.response.order.OrderOwnerListResponseDto;
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
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class OrderServiceImpl implements OrderService {

    private final StoresRepository storesRepository;
    private final UsersRepository usersRepository;
    private final OrdersRepository ordersRepository;
    private final MenuRepository menuRepository;
    private final MenuOptionRepository menuOptionRepository;
    private final OrderMenuRepository orderMenuRepository;

    @Override
    public ResponseEntity<Response> addOrder(OrderAddRequestDto requestDto) {
        Stores stores = storesRepository.findById(requestDto.getStoreId()).orElseThrow(() ->
            new RuntimeException("Store not found"));
        Users users = usersRepository.findUsersByEmail(requestDto.getUserEmail()).orElseThrow(() ->
            new RuntimeException("User not found"));
        Users deliveryUsers = usersRepository.findUsersByEmail(requestDto.getDeliveryUserEmail())
            .orElseThrow(() ->
                new RuntimeException("DeliveryUser not found"));

        //포인트 로직
        if ((requestDto.getPoint() != 0) && (users.getPoint() >= requestDto.getPoint())) {
            users.setPoint(users.getPoint() - requestDto.getPoint());
            usersRepository.save(users);
        } else if ((requestDto.getPoint() == 0)) {
            int grade = users.getGrade();
            users.setPoint(users.getPoint() + (requestDto.getTotalPrice() * grade / 100));
        } else {
            return Response.toResponseEntity(USER_POINT_LESS_THAN_INPUT);
        }

        //주문 테이블 저장
        Orders orders = new Orders(stores.getStoreId(), users.getUserId(),
            deliveryUsers.getUserId(), requestDto.getPaymentMethod(), requestDto.getPoint(),
            requestDto.getTotalPrice(),
            requestDto.getRequests(), LocalDateTime.now(), LocalDateTime.now(), "접수대기",
            requestDto.getAddress());

        Long orderId = ordersRepository.save(orders).getOrderId();

        //메뉴, 메뉴옵션 저장 로직
        List<OrderAddInnerMenusRequestDto> menuList = requestDto.getMenus();
        for (OrderAddInnerMenusRequestDto menusRequestDto : menuList) {
            Menu menu = menuRepository.findById(menusRequestDto.getMenuId())
                .orElseThrow(() -> new RuntimeException("Menu not found"));
            for (OrderAddInnerMenuOptionsRequestDto menuOptionsRequestDto : menusRequestDto.getMenuOptions()) {
                MenuOption menuOption = menuOptionRepository.findById(
                        menuOptionsRequestDto.getMenuOptionId())
                    .orElseThrow(() -> new RuntimeException("MenuOption not found"));
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
        Orders orders = ordersRepository.findById(requestDto.getOrderId())
            .orElseThrow(() -> new RuntimeException("Order not found"));
        orders.setStatus(requestDto.getStatus());
        ordersRepository.save(orders);

        //포인트 로직 (삭제되어도 완료된 애들이니 완료, 삭제인경우를 샘)
        Users users = usersRepository.findById(orders.getOrderUserId())
            .orElseThrow(() -> new RuntimeException("User not found"));

        LocalDateTime startOfMonth = LocalDateTime.now().withDayOfMonth(1).withHour(0).withMinute(0)
            .withSecond(0);
        LocalDateTime endOfMonth = startOfMonth.plusMonths(1).minusSeconds(1);

        long deletedOrCompletedOrderCount = ordersRepository.countByModifiedDateBetweenAndStatusIn(
            startOfMonth, endOfMonth, Arrays.asList("삭제", "완료"));

        if (deletedOrCompletedOrderCount % 5 == 0) {
            int currentGrade = users.getGrade();
            users.setGrade(currentGrade + 1);
            usersRepository.save(users);
        }

        return Response.toResponseEntity(ORDER_STATUS_UPDATE_SUCCESS);
    }

    @Override
    public ResponseEntity<Response> deleteOrder(OrderDeleteRequestDto requestDto) {
        Orders orders = ordersRepository.findById(requestDto.getOrderId())
            .orElseThrow(() -> new RuntimeException("Order not found"));
        orders.setStatus("삭제");
        ordersRepository.save(orders);
        return Response.toResponseEntity(ORDER_DELETE_SUCCESS);
    }

    @Override
    public OrderStatusDetailResponseDto statusDetailOrder(OrderStatusDetailRequestDto requestDto) {
        Orders orders = ordersRepository.findById(requestDto.getOrderId())
            .orElseThrow(() -> new RuntimeException("Order not found"));
        OrderStatusDetailResponseDto responseDto = OrderStatusDetailResponseDto.builder()
            .status(orders.getStatus())
            .build();
        return responseDto;
    }

    @Override
    public OrderOwnerListResponseDto ownerListOrder(OrderOwnerListRequestDto requestDto) {
        List<Orders> ordersList = ordersRepository.findAllByStoreId(requestDto.getStoreId());
        List<OrderOwnerListInnerOrdersResponseDto> innerOrdersResponseDtoList = new ArrayList<>();
        for (Orders orders : ordersList) {
            List<OrderMenu> orderMenus = orderMenuRepository.findAllByOrderId(orders.getOrderId());

            //카운트 계산
            int count = 0;
            int quantity = 0;
            int sequence = 0;
            int tmp = 0;
            for (OrderMenu orderMenu : orderMenus) {
                sequence = orderMenu.getSequence();
                quantity = orderMenu.getQuantity();
                if (tmp != sequence) {
                    count += quantity;
                    tmp = sequence;
                }
            }

            //상태
            String status = orders.getStatus();
            if (status.equals("삭제")) {
                status = "완료";
            }
            OrderMenu orderMenu = orderMenus.get(0);
            String menuName = menuRepository.findById(orderMenu.getMenuId()).get().getName();
            OrderOwnerListInnerOrdersResponseDto innerDtos = OrderOwnerListInnerOrdersResponseDto.builder()
                .orderId(orders.getOrderId())
                .menuName(menuName)
                .count(count)
                .totalPrice(orders.getTotalPrice())
                .orderDate(orders.getCreatedDate())
                .status(status)
                .build();
            innerOrdersResponseDtoList.add(innerDtos);
        }
        OrderOwnerListResponseDto responseDto = OrderOwnerListResponseDto.builder()
            .orders(innerOrdersResponseDtoList)
            .build();
        return responseDto;
    }

    @Override
    public OrderListResponseDto listOrder(OrderListRequestDto requestDto) {
        List<OrderListInnerOrdersResponseDto> innerOrdersResponseDtoList = new ArrayList<>();
        Users users = usersRepository.findUsersByEmail(requestDto.getEmail())
            .orElseThrow(() -> new RuntimeException("User not found"));
        List<Orders> ordersList = ordersRepository.findAllByDeliveryUserId(users.getUserId());
        for (Orders orders : ordersList) {
            if (orders.getStatus().equals("삭제")) {
                continue;
            }
            Stores stores = storesRepository.findById(orders.getStoreId())
                .orElseThrow(() -> new RuntimeException("Store not found"));
            List<OrderMenu> orderMenuList = orderMenuRepository.findAllByOrderId(
                orders.getOrderId());
            int count = 0;
            int quantity = 0;
            int sequence = 0;
            int tmp = 0;
            String menuName = "";
            for (OrderMenu orderMenu : orderMenuList) {
                sequence = orderMenu.getSequence();
                quantity = orderMenu.getQuantity();
                if (tmp != sequence) {
                    count += quantity;
                    tmp = sequence;
                }
                Menu menu = menuRepository.findById(orderMenu.getMenuId())
                    .orElseThrow(() -> new RuntimeException("Menu not found"));
                menuName = menu.getName();
            }

            OrderListInnerOrdersResponseDto innerOrdersResponseDto = OrderListInnerOrdersResponseDto.builder()
                .orderId(orders.getOrderId())
                .storeId(orders.getStoreId())
                .storeName(stores.getName())
                .menuName(menuName)
                .count(count)
                .totalPrice(orders.getTotalPrice())
                .orderDate(orders.getCreatedDate())
                .status(orders.getStatus())
                .build();
            innerOrdersResponseDtoList.add(innerOrdersResponseDto);
        }
        OrderListResponseDto responseDto = OrderListResponseDto.builder()
            .orders(innerOrdersResponseDtoList)
            .build();
        return responseDto;
    }

    //    @Override
//    public OrderDetailResponseDto ownerDetailOrder(OrderOwnerDetailRequestDto requestDto) {
//        Users users = usersRepository.findUsersByEmail(requestDto.getEmail())
//            .orElseThrow(() -> new RuntimeException("User not found"));
//        Orders orders = ordersRepository.findById(requestDto.getOrderId())
//            .orElseThrow(() -> new RuntimeException("Orders not found"));
//        List<OrderMenu> orderMenuList = orderMenuRepository.findAllByOrderId(orders.getOrderId());
//        List<OrderDetailInnerMenusResponseDto> innerMenusResponseDtos = new ArrayList<>();
//        List<OrderDetailInnerMenuOptionsResponseDto> innerMenuOptionsResponseDtos = new ArrayList<>();
//
//        for(OrderMenu orderMenu : orderMenuList){
//            Menu menu = menuRepository.findById(orderMenu.getMenuId()).orElseThrow(()-> new RuntimeException("Menu not found"));
//            MenuOption menuOption = menuOptionRepository.findById(orderMenu.getMenuOptionId()).orElseThrow(()-> new RuntimeException("MenuOption not found"));
//
//            OrderDetailInnerMenuOptionsResponseDto menuOptionsResponseDto = OrderDetailInnerMenuOptionsResponseDto.builder()
//                .menuOptionName(menuOption.getOptions())
//                .menuOptionPrice(menuOption.getPrice())
//                .build();
//            innerMenuOptionsResponseDtos.add(menuOptionsResponseDto);
//        }
//        return null;
//    }
    @Override
    public OrderDetailOwnerResponseDto ownerDetailOrder(OrderOwnerDetailRequestDto requestDto) {
        Users users = usersRepository.findUsersByEmail(requestDto.getEmail())
            .orElseThrow(() -> new RuntimeException("User not found"));

        Orders orders = ordersRepository.findById(requestDto.getOrderId())
            .orElseThrow(() -> new RuntimeException("Orders not found"));

        List<OrderMenu> orderMenuList = orderMenuRepository.findAllByOrderId(orders.getOrderId());
        List<OrderDetailOwnerInnerMenusResponseDto> innerMenusResponseDtos = new ArrayList<>();

        for (OrderMenu orderMenu : orderMenuList) {
            Menu menu = menuRepository.findById(orderMenu.getMenuId())
                .orElseThrow(() -> new RuntimeException("Menu not found"));

            MenuOption menuOption = menuOptionRepository.findById(orderMenu.getMenuOptionId())
                .orElseThrow(() -> new RuntimeException("MenuOption not found"));

            List<OrderDetailOwnerInnerMenuOptionsResponseDto> innerMenuOptionsResponseDtos = new ArrayList<>();
            OrderDetailOwnerInnerMenuOptionsResponseDto menuOptionsResponseDto = OrderDetailOwnerInnerMenuOptionsResponseDto.builder()
                .menuOptionName(menuOption.getOptions())
                .menuOptionPrice(menuOption.getPrice())
                .build();
            innerMenuOptionsResponseDtos.add(menuOptionsResponseDto);

            OrderDetailOwnerInnerMenusResponseDto innerMenusResponseDto = OrderDetailOwnerInnerMenusResponseDto.builder()
                .menuName(menu.getName())
                .menuPrice(menu.getPrice())
                .quantity(orderMenu.getQuantity())
                .sequence(orderMenu.getSequence())
                .menuPictureName(menu.getMenuPictureName())
                .menuOptions(innerMenuOptionsResponseDtos)
                .build();
            innerMenusResponseDtos.add(innerMenusResponseDto);
        }

        OrderDetailOwnerResponseDto responseDto = OrderDetailOwnerResponseDto.builder()
            .paymentMethod(orders.getPaymentMethod())
            .totalPrice(orders.getTotalPrice())
            .point(orders.getPoint())
            .requests(orders.getRequests())
            .status(orders.getStatus())
            .deliveryTip(storesRepository.findById(orders.getStoreId())
                .orElseThrow(() -> new RuntimeException("Store not found")).getDeliveryTip())
            .orderDate(orders.getCreatedDate())
            .address(orders.getAddress())
            .menus(innerMenusResponseDtos)
            .build();

        return responseDto;
    }
}
