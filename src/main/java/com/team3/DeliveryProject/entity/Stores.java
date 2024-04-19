package com.team3.DeliveryProject.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString

@Entity
@Table(name = "Stores")
public class Stores {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long storeId;

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

    @Column(nullable = true)
    private String deliveryAddress;

    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime createdDate;

    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime modifiedDate;

    @Column(nullable = false)
    private String status;
}
