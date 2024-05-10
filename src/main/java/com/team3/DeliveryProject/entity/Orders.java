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
@Table(name = "Orders")
public class Orders {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;
    private Long storeId;
    private Long userId;

    @Column(nullable = false)
    private String paymentMethod;

    @Column(nullable = false)
    private int totalPrice;

    @Column(nullable = true)
    private String requests;

    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime createdDate;

    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime modifiedDate;

    @Column(nullable = false)
    private String status;
}
