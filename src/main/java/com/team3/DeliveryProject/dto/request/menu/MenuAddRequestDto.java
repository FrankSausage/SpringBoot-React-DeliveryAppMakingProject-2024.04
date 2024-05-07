package com.team3.DeliveryProject.dto.request.menu;

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
public class MenuAddRequestDto {
    private Long storeId;
    private String category;
    private String name;
    private String content;
    private int price;
    private String menuPictureName;
    private byte popularity;
    private String email;
}
