package com.team3.DeliveryProject.dto.response.order;

import java.time.LocalDateTime;
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
public class OrderDetailOwnerResponseDto {
    private String paymentMethod;
    private int totalPrice;
    private int point;
    private String requests;
    private String status;
    private int deliveryTip;
    private LocalDateTime orderDate;
    private String address;
    private List<OrderDetailOwnerInnerMenusResponseDto> menus;
}
