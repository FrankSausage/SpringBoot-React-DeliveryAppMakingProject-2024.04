package com.team3.DeliveryProject.dto.request.menuOption;

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
public class MenuOptionUpdateRequestDto {
    private Long menuOptionId;
    private String options;
    private String content;
    private int price;
    private String email;
}
