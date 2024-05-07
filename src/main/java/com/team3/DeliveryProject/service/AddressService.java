package com.team3.DeliveryProject.service;

import com.team3.DeliveryProject.dto.common.Response;
import com.team3.DeliveryProject.dto.request.address.AddressAddRequestDto;
import com.team3.DeliveryProject.dto.request.address.AddressChangeRequestDto;
import com.team3.DeliveryProject.dto.request.address.AddressDeleteRequestDto;
import com.team3.DeliveryProject.dto.request.address.AddressFindAllRequestDto;
import com.team3.DeliveryProject.dto.request.address.AddressModifyRequestDto;
import com.team3.DeliveryProject.dto.response.address.AddressFindAllResponseDto;
import com.team3.DeliveryProject.entity.Address;
import java.util.List;
import org.springframework.http.ResponseEntity;

public interface AddressService {
    public ResponseEntity<Response> addAddress(AddressAddRequestDto requestDto);
    public ResponseEntity<Response> modifyAddress(AddressModifyRequestDto requestDto);
    public ResponseEntity<Response> deleteAddress(AddressDeleteRequestDto requestDto);
    public List<AddressFindAllResponseDto> findAllAddress(AddressFindAllRequestDto requestDto);
    public ResponseEntity<Response> changeCurrentAddress(AddressChangeRequestDto requestDto);
}
