package com.team3.DeliveryProject.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
@Table(name = "CeoReviews")
public class CeoReviews {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long CeoReviewId;
    private Long reviewId;

    @Column(nullable = true)
    private String content;

    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime createdDate;

    public CeoReviews(Long reviewId, String content, LocalDateTime createdDate) {
        this.reviewId = reviewId;
        this.content = content;
        this.createdDate = createdDate;
    }
}
