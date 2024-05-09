package com.team3.DeliveryProject.dto.response.menu;

import com.team3.DeliveryProject.entity.Address;
import com.team3.DeliveryProject.entity.Menu;
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
public class MenuListGetInnerMenusResponseDto {
    private Long menuId;
    private String category;
    private String name;
    private int price;
    private String content;
    private String menuPictureName;
    private byte popularity;
    private String status;

    public MenuListGetInnerMenusResponseDto(Menu menu) {
        this.menuId = menu.getMenuId();
        this.category = menu.getCategory();
        this.name = menu.getName();
        this.price = menu.getPrice();
        this.content = menu.getContent();
        this.menuPictureName = menu.getMenuPictureName();
        this.popularity = menu.getPopularity();
        this.status = menu.getStatus();
    }
}
