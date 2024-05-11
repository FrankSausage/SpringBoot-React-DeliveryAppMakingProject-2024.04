package com.team3.DeliveryProject.repository;

import com.team3.DeliveryProject.entity.Carts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartsRepository extends JpaRepository<Carts, Long> {

}
