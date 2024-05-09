package com.team3.DeliveryProject.dto.koodohyeon;

import com.team3.DeliveryProject.entity.Menu;
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
public class MenuDto {

    private Long menuId;
    private Long storeId;
    private String category;
    private String name;
    private int price;
    private String menuPictureName;
    private int popularity;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;
    private String status;

    public static MenuDto toDTO(Menu entity) {
        return MenuDto.builder()
            .menuId(entity.getMenuId())
            .storeId(entity.getStoreId())
            .category(entity.getCategory())
            .name(entity.getName())
            .price(entity.getPrice())
            .menuPictureName(entity.getMenuPictureName())
            .popularity(entity.getPopularity())
            .createdDate(entity.getCreatedDate())
            .modifiedDate(entity.getModifiedDate())
            .status(entity.getStatus())
            .build();
    }
}