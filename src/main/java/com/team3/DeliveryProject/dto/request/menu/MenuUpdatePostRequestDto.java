package com.team3.DeliveryProject.dto.request.menu;

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
public class MenuUpdatePostRequestDto {
    private Long menuId;
    private String category;
    private String name;
    private int price;
    private String menuPictureName;
    private String content;
    private byte popularity;
}
