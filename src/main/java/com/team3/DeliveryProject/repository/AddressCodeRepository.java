package com.team3.DeliveryProject.repository;

import com.team3.DeliveryProject.entity.AddressCode;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AddressCodeRepository extends JpaRepository<AddressCode, Long> {
    Optional<List<AddressCode>> findAllByStoreId(Long storeId);

}
