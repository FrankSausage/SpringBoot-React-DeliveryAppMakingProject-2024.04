package com.team3.DeliveryProject.entity;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Reviews {
    private int reviewId;
    private int storeId;
    private int userId;
    private int menuId;
    private int rating;
    private String content;
    private String reviewPictureName;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;
    private String status;

}
