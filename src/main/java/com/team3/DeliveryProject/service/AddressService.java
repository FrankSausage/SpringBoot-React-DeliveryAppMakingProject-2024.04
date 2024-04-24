package com.team3.DeliveryProject.service;

import com.team3.DeliveryProject.dto.common.Response;
import com.team3.DeliveryProject.dto.request.AddressAddRequestDto;
import com.team3.DeliveryProject.dto.request.AddressDeleteRequestDto;
import com.team3.DeliveryProject.dto.request.AddressModifyRequestDto;
import com.team3.DeliveryProject.entity.Address;
import com.team3.DeliveryProject.entity.Users;
import java.util.List;
import org.springframework.http.ResponseEntity;

public interface AddressService {
    public ResponseEntity<Response> addAddress(AddressAddRequestDto requestDto);
    public ResponseEntity<Response> modifyAddress(AddressModifyRequestDto requestDto);
    public ResponseEntity<Response> deleteAddress(AddressDeleteRequestDto requestDto);
    public List<Address> findAllAddress();

}
