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
@Table(name = "Address")
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long addressId;
    private Long userId;

    public Address(Long userId, String address, LocalDateTime createdDate,
        LocalDateTime modifiedDate,
        String status) {
        this.userId = userId;
        this.address = address;
        this.createdDate = createdDate;
        this.modifiedDate = modifiedDate;
        this.status = status;
    }

    public Address(Long userId, String address, Long addressCode, LocalDateTime createdDate,
        LocalDateTime modifiedDate, String status) {
        this.userId = userId;
        this.address = address;
        this.addressCode = addressCode;
        this.createdDate = createdDate;
        this.modifiedDate = modifiedDate;
        this.status = status;
    }

    @Column(nullable = false)
    private String address;
    @Column(nullable = false)
    private Long addressCode;
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime createdDate;

    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime modifiedDate;

    @Column(nullable = false)
    private String status;

    public Address(Long userId, String address, String status) {
        this.userId = userId;
        this.address = address;
        this.status = status;
    }
}
