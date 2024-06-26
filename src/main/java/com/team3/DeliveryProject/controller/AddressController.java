package com.team3.DeliveryProject.controller;

import com.team3.DeliveryProject.dto.request.address.AddressAddRequestDto;
import com.team3.DeliveryProject.dto.request.address.AddressChangeRequestDto;
import com.team3.DeliveryProject.dto.request.address.AddressDeleteRequestDto;
import com.team3.DeliveryProject.dto.request.address.AddressFindAllRequestDto;
import com.team3.DeliveryProject.dto.request.address.AddressModifyRequestDto;
import com.team3.DeliveryProject.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/address")
public class AddressController {

    @Autowired
    private AddressService addressService;

    @PostMapping("/add")
    public ResponseEntity<?> addAddress(@RequestBody AddressAddRequestDto requestDto) {

        addressService.addAddress(requestDto);
        return ResponseEntity.ok().body("Address registered successfully");
    }

    @PostMapping("/delete")
    public ResponseEntity<?> deleteAddress(@RequestBody AddressDeleteRequestDto requestDto) {

        addressService.deleteAddress(requestDto);
        return ResponseEntity.ok().body("Address deleted successfully");
    }

    @PostMapping("/modify")
    public ResponseEntity<?> modifyAddress(@RequestBody AddressModifyRequestDto requestDto) {

        addressService.modifyAddress(requestDto);
        return ResponseEntity.ok().body("Address modified successfully");
    }

    @GetMapping("/getList")
    public ResponseEntity<?> getListAddress(@ModelAttribute AddressFindAllRequestDto requestDto) {
        return ResponseEntity.ok().body(addressService.findAllAddress(requestDto));
    }

    @PostMapping("/change")
    public ResponseEntity<?> changeAddress(@RequestBody AddressChangeRequestDto requestDto) {
        return ResponseEntity.ok().body(addressService.changeCurrentAddress(requestDto));
    }

}
