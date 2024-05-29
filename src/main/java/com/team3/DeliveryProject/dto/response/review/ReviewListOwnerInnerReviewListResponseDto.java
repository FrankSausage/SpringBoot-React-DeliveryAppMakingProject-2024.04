package com.team3.DeliveryProject.dto.response.review;

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
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReviewListOwnerInnerReviewListResponseDto {
    private Long reviewId;
    private String content;
    private int rating;
    private String userName;
    private int userGrade;
    private int storeType;
    private LocalDateTime createdDate;
    private String reviewPictureName;
    private String ceoReviewContent;
    private LocalDateTime ceoReviewCreatedDate;
    private Long ceoReviewId;
}
