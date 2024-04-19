package com.team3.DeliveryProject.dto;


import com.team3.DeliveryProject.entity.CeoReviews;
import com.team3.DeliveryProject.entity.Dibs;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DibsDto {
    private Long userId;
    private Long storeId;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;
    private String status;

    public static DibsDto toDTO(Dibs entity){
        return DibsDto.builder()
                .userId(entity.getUserId())
                .storeId(entity.getStoreId())
                .createdDate(entity.getCreatedDate())
                .modifiedDate(entity.getModifiedDate())
                .status(entity.getStatus())
                .build();
    }
}
