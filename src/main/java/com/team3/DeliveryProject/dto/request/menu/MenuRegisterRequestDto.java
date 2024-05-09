package com.team3.DeliveryProject.dto.request.menu;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MenuRegisterRequestDto {

    private Long storeId;
    private String category;
    private String name;
    private int price;
    private String menuPictureName;
    private int popularity;
}
