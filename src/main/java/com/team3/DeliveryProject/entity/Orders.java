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
    private Long orderUserId;
    private Long deliveryUserId;
    @Column(nullable = false)
    private String paymentMethod;
    private int point;

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
    private String address;

    public Orders(Long storeId, Long orderUserId, Long deliveryUserId, String paymentMethod,
        int point,
        int totalPrice, String requests, LocalDateTime createdDate, LocalDateTime modifiedDate,
        String status, String address) {
        this.storeId = storeId;
        this.orderUserId = orderUserId;
        this.deliveryUserId = deliveryUserId;
        this.paymentMethod = paymentMethod;
        this.point = point;
        this.totalPrice = totalPrice;
        this.requests = requests;
        this.createdDate = createdDate;
        this.modifiedDate = modifiedDate;
        this.status = status;
        this.address = address;
    }
}
