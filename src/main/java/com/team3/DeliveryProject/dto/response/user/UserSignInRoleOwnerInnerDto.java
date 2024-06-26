package com.team3.DeliveryProject.dto.response.user;

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
public class UserSignInRoleOwnerInnerDto {

    private Long storeId;
    private String storePictureName;
    private String name;
}
