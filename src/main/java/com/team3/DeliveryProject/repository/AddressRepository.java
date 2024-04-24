package com.team3.DeliveryProject.repository;

import com.team3.DeliveryProject.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {

    Optional<Address> findAddressByUserId(Long uId);

}
