package com.team3.DeliveryProject.repository;

import com.team3.DeliveryProject.entity.Dibs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DibsRepository  extends JpaRepository<Dibs, Long> {
}
