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
@Table(name = "Users")
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String phone;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private int grade;

    @Column(nullable = false)
    private String role;

    @Column(nullable = true)
    private String currentAddress;

    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime createdDate;

    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime modifiedDate;

    @Column(nullable = false)
    private String status;

    @Column(nullable = false)
    private int point;

    public Users(String password, String name, String phone, String email, int grade, String role,
        String currentAddress, LocalDateTime createdDate, LocalDateTime modifiedDate, String status,
        int point) {
        this.password = password;
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.grade = grade;
        this.role = role;
        this.currentAddress = currentAddress;
        this.createdDate = createdDate;
        this.modifiedDate = modifiedDate;
        this.status = status;
        this.point = point;
    }

    public Users(String password, String name, String phone, String email, int grade,
        String role, String currentAddress, String status, int point) {
        this.password = password;
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.grade = grade;
        this.role = role;
        this.currentAddress = currentAddress;
        this.status = status;
        this.point = point;
    }
}
