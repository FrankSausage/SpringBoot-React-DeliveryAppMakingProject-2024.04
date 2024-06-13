package com.team3.DeliveryProject.repository;

import com.team3.DeliveryProject.entity.Address;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {

    Optional<Address> findAddressByUserId(Long uId);
    Optional<Address> findAddressByUserIdAndAddress(Long userId, String address);

    Optional<Address> findAddressByAddressId(Long addressId);

    List<Address> findAllByUserId(Long userId);

}
