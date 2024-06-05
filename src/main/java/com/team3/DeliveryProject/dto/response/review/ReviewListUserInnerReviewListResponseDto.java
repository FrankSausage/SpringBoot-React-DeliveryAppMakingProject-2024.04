package com.team3.DeliveryProject.dto.response.review;

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
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReviewListUserInnerReviewListResponseDto {
    private Long reviewId;
    private String storeName;
    private Long storeId;
    private String content;
    private int rating;
    private int storeType;
    private LocalDateTime createdDate;
    private String reviewPictureName;
    private String ceoReviewContent;
    private LocalDateTime ceoReviewCreatedDate;
}
