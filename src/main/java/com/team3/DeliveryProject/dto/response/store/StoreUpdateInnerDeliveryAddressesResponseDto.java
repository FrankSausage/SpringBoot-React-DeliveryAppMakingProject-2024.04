package com.team3.DeliveryProject.dto.response.store;

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
public class StoreUpdateInnerDeliveryAddressesResponseDto {
    private Long addressCode;
    private String deliveryAddress;
}
