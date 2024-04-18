package com.team3.DeliveryProject.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UsersDto {
    private int userId;
    private String password;
    private String name;
    private String phone;
    private String email;
    private int grade;
    private String role;
    private String currentAddress;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;
    private String status;
    private int point;

}
