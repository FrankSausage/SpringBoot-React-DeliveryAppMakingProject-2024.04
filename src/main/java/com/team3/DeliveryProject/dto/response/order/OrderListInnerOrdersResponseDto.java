package com.team3.DeliveryProject.dto.response.order;

import java.time.LocalDateTime;
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
public class OrderListInnerOrdersResponseDto {
    private Long orderId;
    private String menuName;
    private int count;
    private int totalPrice;
    private LocalDateTime orderDate;
    private String status;
}
