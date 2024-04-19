package com.team3.DeliveryProject.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString


@Entity
@Table(name = "MenuOption")
public class MenuOption {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long menuOptionId;
    private Long menuId;

    @Column(nullable = false)
    private String option;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private int price;

    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime createdDate;

    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime modifiedDate;

    @Column(nullable = false)
    private String status;
}
