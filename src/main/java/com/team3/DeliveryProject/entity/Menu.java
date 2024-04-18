package com.team3.DeliveryProject.entity;

import java.time.LocalDateTime;
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
public class Menu {
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