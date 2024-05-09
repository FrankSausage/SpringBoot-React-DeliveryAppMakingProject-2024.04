package com.team3.DeliveryProject.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "Reviews")
public class Reviews {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewId;
    private Long storeId;
    private Long userId;
    private Long menuId;

    @Column(nullable = false)
    private int rating;

    @Lob
    @Column(nullable = true)
    private String content;

    @Column(nullable = true)
    private String reviewPictureName;

    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime createdDate;

    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime modifiedDate;

    @Column(nullable = false)
    private String status;

    public Reviews(Long storeId, Long userId, Long menuId, int rating, String content, String reviewPictureName, LocalDateTime createdDate, LocalDateTime modifiedDate, String status) {
        this.storeId = storeId;
        this.userId = userId;
        this.menuId = menuId;
        this.rating = rating;
        this.content = content;
        this.reviewPictureName = reviewPictureName;
        this.createdDate = createdDate;
        this.modifiedDate = modifiedDate;
        this.status = status;
    }
}
