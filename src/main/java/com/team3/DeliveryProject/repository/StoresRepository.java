package com.team3.DeliveryProject.repository;

import com.team3.DeliveryProject.entity.Stores;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StoresRepository  extends JpaRepository<Stores, Long> {
}
