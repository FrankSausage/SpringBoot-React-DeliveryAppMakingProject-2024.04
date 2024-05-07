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
@Table(name = "MenuOption")
public class MenuOption {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long menuOptionId;
    private Long menuId;

    @Column(nullable = false)
    private String options;

    @Column(nullable = false)
    private int price;

    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime createdDate;

    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime modifiedDate;

    @Column(nullable = false)
    private String status;

    public MenuOption(Long menuId, String option, int price, LocalDateTime createdDate,
        LocalDateTime modifiedDate, String status) {
        this.menuId = menuId;
        this.options = option;
        this.price = price;
        this.createdDate = createdDate;
        this.modifiedDate = modifiedDate;
        this.status = status;
    }
}
