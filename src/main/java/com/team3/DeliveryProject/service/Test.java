package com.team3.DeliveryProject.service;


import com.team3.DeliveryProject.repository.AddressRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class Test {

    private final AddressRepository addressRepository;

    public void findTest() {
    }
}
