package com.team3.DeliveryProject.dto.response.menu;

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
public class MenuUpdateInnerMenusResponseDto {

    private Long menuId;
    private String category;
    private String name;
    private int price;
    private String menuPictureName;
    private byte popularity;
    private String content;
    private List<MenuUpdateInnerOptionsResponseDto> options;
}
