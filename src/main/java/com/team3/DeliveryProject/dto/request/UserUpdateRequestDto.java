package com.team3.DeliveryProject.dto.request;

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
@Builder
public class UserUpdateRequestDto {
    private String password;
    private String name;
    private String phone;
    private String email;
    private String currentAddress;
}
