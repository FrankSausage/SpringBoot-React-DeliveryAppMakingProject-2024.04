package com.team3.DeliveryProject.dto;

import com.team3.DeliveryProject.entity.CeoReviews;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CeoReviewsDto {
    private Long reviewId;
    private String content;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;
    private String status;

    public static CeoReviewsDto toDTO(CeoReviews entity){
        return CeoReviewsDto.builder()
                .reviewId(entity.getReviewId())
                .content(entity.getContent())
                .createdDate(entity.getCreatedDate())
                .modifiedDate(entity.getModifiedDate())
                .status(entity.getStatus())
                .build();
    }

}
