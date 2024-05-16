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
public class OrderAddInnerMenusRequestDto {

    private Long menuId;
    private int quantity;
    private int sequence;
    private List<OrderAddInnerMenuOptionsRequestDto> menuOptions;
}
