package com.team3.DeliveryProject.dto.koodohyeon;

import com.team3.DeliveryProject.entity.Address;
import java.time.LocalDateTime;
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
