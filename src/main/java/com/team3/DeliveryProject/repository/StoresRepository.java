package com.team3.DeliveryProject.repository;

import com.team3.DeliveryProject.entity.Address;
import com.team3.DeliveryProject.entity.Stores;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface StoresRepository  extends JpaRepository<Stores, Long> {
    List<Stores> findAllByUserId(Long userId);
    List<Stores> findByCategoryContaining(String category);
    List<Stores> findByNameContaining(String name);
}
