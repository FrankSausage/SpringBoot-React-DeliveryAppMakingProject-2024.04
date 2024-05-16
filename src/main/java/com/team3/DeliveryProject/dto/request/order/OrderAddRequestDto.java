package com.team3.DeliveryProject.dto.request.order;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderAddRequestDto {

    private Long storeId;
    private String userEmail;
    private String deliveryUserEmail;
    private String paymentMethod;
    private int point;
    private int totalPrice;
    private String requests;
    private String address;
    private List<OrderAddInnerMenusRequestDto> menus;

}