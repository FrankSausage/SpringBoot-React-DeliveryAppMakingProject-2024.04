package com.team3.DeliveryProject.dto.koodohyeon;

import com.team3.DeliveryProject.entity.Reviews;
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
public class ReviewsDto {

    private Long reviewId;
    private Long storeId;
    private Long userId;
    private Long menuId;
    private int rating;
    private String content;
    private String reviewPictureName;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;
    private String status;

    public static ReviewsDto toDTO(Reviews entity) {
        return ReviewsDto.builder()
            .reviewId(entity.getReviewId())
            .storeId(entity.getStoreId())
            .userId(entity.getUserId())
            .menuId(entity.getMenuId())
            .rating(entity.getRating())
            .content(entity.getContent())
            .reviewPictureName(entity.getReviewPictureName())
            .createdDate(entity.getCreatedDate())
            .modifiedDate(entity.getModifiedDate())
            .status(entity.getStatus())
            .build();
    }

}
