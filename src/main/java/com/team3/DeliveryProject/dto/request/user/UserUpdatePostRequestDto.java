package com.team3.DeliveryProject.dto.request.user;

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
public class UserUpdatePostRequestDto {
    private String currentAddress;
    private String email;
    private String name;
    private String phone;
    private Long addressCode;
}
