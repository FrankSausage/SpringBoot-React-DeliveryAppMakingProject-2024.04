package com.team3.DeliveryProject.dto;

import com.team3.DeliveryProject.entity.Users;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UsersDto {
    private Long userId;
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

    public static UsersDto toDTO(Users entity) {
        return UsersDto.builder()
                .userId(entity.getUserId())
                .password(entity.getPassword())
                .name(entity.getName())
                .phone(entity.getPhone())
                .email(entity.getEmail())
                .grade(entity.getGrade())
                .role(entity.getRole())
                .currentAddress(entity.getCurrentAddress())
                .createdDate(entity.getCreatedDate())
                .status(entity.getStatus())
                .point(entity.getPoint())
                .build();
    }

}
