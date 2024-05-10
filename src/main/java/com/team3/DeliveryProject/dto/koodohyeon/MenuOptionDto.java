package com.team3.DeliveryProject.dto.koodohyeon;

import com.team3.DeliveryProject.entity.MenuOption;
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
public class MenuOptionDto {

    private Long menuOptionId;
    private Long menuId;
    private String options;
    private String content;
    private int price;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;
    private String status;

    public static MenuOptionDto toDTO(MenuOption entity) {
        return MenuOptionDto.builder()
            .menuOptionId(entity.getMenuOptionId())
            .menuId(entity.getMenuId())
            .options(entity.getOptions())
            .price(entity.getPrice())
            .createdDate(entity.getCreatedDate())
            .modifiedDate(entity.getModifiedDate())
            .status(entity.getStatus())
            .build();
    }
}
