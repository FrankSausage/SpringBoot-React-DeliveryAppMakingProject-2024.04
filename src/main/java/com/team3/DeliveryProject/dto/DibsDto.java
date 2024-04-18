package com.team3.DeliveryProject.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DibsDto {
    private int userId;
    private int storeId;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;
    private String status;

}
