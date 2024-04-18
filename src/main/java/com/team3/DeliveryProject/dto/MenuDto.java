package com.team3.DeliveryProject.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MenuDto {
    private int menuId;
    private int storeId;
    private String category;
    private String name;
    private int price;
    private String menuPictureName;
    private int popularity;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;
    private String status;

}