package com.team3.DeliveryProject.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MenuOptionDto {
    private int menuOptionId;
    private int menuId;
    private String option;
    private String content;
    private int price;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;
    private String status;
}
