package com.team3.DeliveryProject.service;

import static com.team3.DeliveryProject.responseCode.ResponseCode.ADDRESS_ADD_SUCCESS;
import static com.team3.DeliveryProject.responseCode.ResponseCode.ADDRESS_DELETE_SUCCESS;
import static com.team3.DeliveryProject.responseCode.ResponseCode.ADDRESS_MODIFY_SUCCESS;

import com.team3.DeliveryProject.dto.common.Response;
import com.team3.DeliveryProject.dto.request.address.AddressAddRequestDto;
import com.team3.DeliveryProject.dto.request.address.AddressDeleteRequestDto;
import com.team3.DeliveryProject.dto.request.address.AddressModifyRequestDto;
import com.team3.DeliveryProject.entity.Address;
import com.team3.DeliveryProject.repository.AddressRepository;
import com.team3.DeliveryProject.repository.UsersRepository;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class AddressServiceImpl implements AddressService{

    private final UsersRepository usersRepository;
    private final AddressRepository addressRepository;
    @Override
    public ResponseEntity<Response> addAddress(AddressAddRequestDto requestDto) {
        System.out.println("서비스 정상로직 진입");

        Address address = new Address(requestDto.getUserId(), requestDto.getAddress(), "일반");
        address.setCreatedDate(LocalDateTime.now());
        address.setModifiedDate(LocalDateTime.now());
        System.out.println(address);
        addressRepository.save(address);

        return Response.toResponseEntity(ADDRESS_ADD_SUCCESS);
    }

    @Override
    public ResponseEntity<Response> modifyAddress(AddressModifyRequestDto requestDto) {
        Address address = addressRepository.findAddressByAddressId(requestDto.getAddressId()).get();
        address.setAddress(requestDto.getAddress());
        address.setStatus("수정");
        address.setModifiedDate(LocalDateTime.now());
        addressRepository.save(address);
        return Response.toResponseEntity(ADDRESS_MODIFY_SUCCESS);
    }

    @Override
    public ResponseEntity<Response> deleteAddress(AddressDeleteRequestDto requestDto) {
        Address address = addressRepository.findAddressByAddressId(requestDto.getAddressId()).get();
        address.setStatus("삭제");
        addressRepository.save(address);
        return Response.toResponseEntity(ADDRESS_DELETE_SUCCESS);
    }

    @Override
    public List<Address> findAllAddress() {
        return addressRepository.findAll();
    }
}
