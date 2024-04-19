package com.team3.DeliveryProject.dto;

import com.team3.DeliveryProject.entity.Address;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AddressDto {
    private Long addressId;
    private Long userId;
    private String address;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;
    private String status;

    public static AddressDto toDTO(Address entity) {
        return AddressDto.builder()
                .addressId(entity.getAddressId())
                .userId(entity.getUserId())
                .address(entity.getAddress())
                .createdDate(entity.getCreatedDate())
                .modifiedDate(entity.getModifiedDate())
                .status(entity.getStatus())
                .build();
    }


}
