package com.team3.DeliveryProject.service;


import com.team3.DeliveryProject.entity.Address;
import com.team3.DeliveryProject.repository.AddressRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class Test {
        private final AddressRepository addressRepository;
        public void findTest() {
            System.out.println(addressRepository.findAddressByUserId(1L));
        }
}
