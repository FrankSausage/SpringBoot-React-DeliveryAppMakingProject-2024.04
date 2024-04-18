package com.team3.DeliveryProject.entity;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Dibs {
    private int userId;
    private int storeId;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;
    private String status;

}
