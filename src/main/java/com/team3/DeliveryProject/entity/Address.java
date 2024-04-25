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

    @Column(nullable = false)
    private String address;

    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime createdDate;

    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime modifiedDate;

    @Column(nullable = false)
    private String status;
}
