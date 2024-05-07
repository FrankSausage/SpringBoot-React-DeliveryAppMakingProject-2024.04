package com.team3.DeliveryProject.service;

import static com.team3.DeliveryProject.responseCode.ResponseCode.ADDRESS_ADD_SUCCESS;
import static com.team3.DeliveryProject.responseCode.ResponseCode.ADDRESS_DELETE_SUCCESS;
import static com.team3.DeliveryProject.responseCode.ResponseCode.ADDRESS_MODIFY_SUCCESS;

import com.team3.DeliveryProject.dto.common.Response;
import com.team3.DeliveryProject.dto.request.address.AddressAddRequestDto;
import com.team3.DeliveryProject.dto.request.address.AddressDeleteRequestDto;
import com.team3.DeliveryProject.dto.request.address.AddressFindAllRequestDto;
import com.team3.DeliveryProject.dto.request.address.AddressModifyRequestDto;
import com.team3.DeliveryProject.dto.response.address.AddressFindAllResponseDto;
import com.team3.DeliveryProject.entity.Address;
import com.team3.DeliveryProject.entity.Users;
import com.team3.DeliveryProject.repository.AddressRepository;
import com.team3.DeliveryProject.repository.UsersRepository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
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

        Address address = new Address(user.getUserId(), requestDto.getAddress(), requestDto.getAddressCode(),
            LocalDateTime.now(), LocalDateTime.now(),"일반");
        addressRepository.save(address);

        return Response.toResponseEntity(ADDRESS_ADD_SUCCESS);
    }

    @Override
    public ResponseEntity<Response> modifyAddress(AddressModifyRequestDto requestDto) {
        Address address = addressRepository.findAddressByAddressId(requestDto.getAddressId()).get();
        address.setAddress(requestDto.getAddress());
        address.setAddressCode(requestDto.getAddressCode());
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
    public List<AddressFindAllResponseDto> findAllAddress(AddressFindAllRequestDto requestDto) {
        Users user = usersRepository.findUsersByEmail(requestDto.getEmail()).orElseThrow(() -> new RuntimeException("User not found"));
        List<Address> addresses = addressRepository.findAllByUserId(user.getUserId());
        List<AddressFindAllResponseDto> responseDtos = addresses.stream()
            .filter(address -> !address.getStatus().equals("삭제"))
            .map(address -> new AddressFindAllResponseDto(address))
            .collect(Collectors.toList());
        System.out.println(responseDtos);
        return responseDtos;
    }

    @Override
    public ResponseEntity<Response> changeCurrentAddress(AddressChangeRequestDto requestDto) {
        Users user = usersRepository.findUsersByEmail(requestDto.getEmail()).orElseThrow(()->new RuntimeException("User not found"));
        user.setCurrentAddress(requestDto.getAddress());
        user.setAddressCode(requestDto.getAddressCode());
        usersRepository.save(user);
        return Response.toResponseEntity(ADDRESS_CHANGE_SUCCESS);
    }

}
