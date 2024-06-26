package com.team3.DeliveryProject.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

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
    private Long userId;
    private Long orderId;
    @Column(nullable = false)
    private int rating;

    @Lob
    @Column(nullable = true)
    private String content;

    @Column(nullable = true)
    private String reviewPictureName;

    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime createdDate;

    public Reviews(Long userId, Long orderId, int rating, String content, String reviewPictureName,
        LocalDateTime createdDate) {
        this.userId = userId;
        this.orderId = orderId;
        this.rating = rating;
        this.content = content;
        this.reviewPictureName = reviewPictureName;
        this.createdDate = createdDate;
    }
}
