package com.team3.DeliveryProject.dto.response.address;

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
public class AddressFindAllResponseDto {

    private Long addressId;
    private Long userId;
    private String address;
    private Long addressCode;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;
    private String status;


    public AddressFindAllResponseDto(Address address) {
        this.addressId = address.getAddressId();
        this.userId = address.getUserId();
        this.address = address.getAddress();
        this.addressCode = address.getAddressCode();
        this.createdDate = address.getCreatedDate();
        this.modifiedDate = address.getModifiedDate();
        this.status = address.getStatus();
    }
}
