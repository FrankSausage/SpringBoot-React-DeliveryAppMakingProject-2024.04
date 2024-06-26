package com.team3.DeliveryProject.dto.request.address;

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
public class AddressModifyRequestDto {

    private Long addressId;
    private String address;
    private Long addressCode;
    private String email;
}
