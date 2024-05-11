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
    @Column(nullable = false)
    private Long addressCode;

    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime createdDate;

    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime modifiedDate;

    @Column(nullable = false)
    private String status;

    @Column(nullable = false)
    private int point;

    public Users(String password, String name, String phone, String email, int grade, String role,
        String currentAddress, Long addressCode, LocalDateTime createdDate,
        LocalDateTime modifiedDate,
        String status, int point) {
        this.password = password;
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.grade = grade;
        this.role = role;
        this.currentAddress = currentAddress;
        this.addressCode = addressCode;
        this.createdDate = createdDate;
        this.modifiedDate = modifiedDate;
        this.status = status;
        this.point = point;
    }

    public Users(String password, String name, String phone, String email, int grade, String role,
        String currentAddress, Long addressCode, String status, int point) {
        this.password = password;
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.grade = grade;
        this.role = role;
        this.currentAddress = currentAddress;
        this.addressCode = addressCode;
        this.status = status;
        this.point = point;
    }

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
