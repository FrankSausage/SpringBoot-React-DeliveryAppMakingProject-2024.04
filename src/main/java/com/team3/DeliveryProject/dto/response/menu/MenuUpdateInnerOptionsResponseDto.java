package com.team3.DeliveryProject.dto.response.menu;

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
public class MenuUpdateInnerOptionsResponseDto {

    private Long menuOptionId;
    private String options;
    private int price;
}
