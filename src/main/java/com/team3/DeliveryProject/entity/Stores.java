package com.team3.DeliveryProject.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import org.hibernate.annotations.DialectOverride.ColumnDefault;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Stores")
public class Stores {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long storeId;
    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private int type;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private String address;

    @Column(nullable = true)
    private String storePictureName;

    @Column(nullable = false)
    private String phone;

    @Column(nullable = true)
    private String content;

    @Column(nullable = false)
    private int minDeliveryPrice;

    @Column(nullable = false)
    private int deliveryTip;

    @Column(nullable = true)
    private int minDeliveryTime;

    @Column(nullable = true)
    private int maxDeliveryTime;

    @Column(nullable = false)
    private double rating;

    @Column(nullable = false)
    private int dibsCount;

    @Column(nullable = false)
    private int reviewCount;

    @Column(nullable = true)
    private String operationHours;

    @Column(nullable = true)
    private String closedDays;

    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime createdDate;

    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime modifiedDate;

    @Column(nullable = false)
    private String status;

    public Stores(Long userId, String name, int type, String category, String address,
        String storePictureName, String phone, String content, int minDeliveryPrice,
        int deliveryTip,
        int minDeliveryTime, int maxDeliveryTime, double rating, int dibsCount, int reviewCount,
        String operationHours, String closedDays, LocalDateTime createdDate,
        LocalDateTime modifiedDate, String status) {
        this.userId = userId;
        this.name = name;
        this.type = type;
        this.category = category;
        this.address = address;
        this.storePictureName = storePictureName;
        this.phone = phone;
        this.content = content;
        this.minDeliveryPrice = minDeliveryPrice;
        this.deliveryTip = deliveryTip;
        this.minDeliveryTime = minDeliveryTime;
        this.maxDeliveryTime = maxDeliveryTime;
        this.rating = rating;
        this.dibsCount = dibsCount;
        this.reviewCount = reviewCount;
        this.operationHours = operationHours;
        this.closedDays = closedDays;
        this.createdDate = createdDate;
        this.modifiedDate = modifiedDate;
        this.status = status;
    }
}
