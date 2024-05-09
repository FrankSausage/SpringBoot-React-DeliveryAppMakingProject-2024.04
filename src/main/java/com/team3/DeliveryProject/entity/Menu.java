package com.team3.DeliveryProject.entity;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
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
@Table(name = "Menu")
public class Menu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long menuId;
    private Long storeId;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private String name;
    @Column(nullable = true)
    private String content;
    @Column(nullable = false)
    private int price;

    @Column(nullable = true)
    private String menuPictureName;

    @Column(nullable = false)
    private byte popularity;

    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime createdDate;

    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime modifiedDate;

    @Column(nullable = false)
    private String status;

    public Menu(Long storeId, String category, String name, String content, int price,
        String menuPictureName, byte popularity, LocalDateTime createdDate,
        LocalDateTime modifiedDate,
        String status) {
        this.storeId = storeId;
        this.category = category;
        this.name = name;
        this.content = content;
        this.price = price;
        this.menuPictureName = menuPictureName;
        this.popularity = popularity;
        this.createdDate = createdDate;
        this.modifiedDate = modifiedDate;
        this.status = status;
    }
}