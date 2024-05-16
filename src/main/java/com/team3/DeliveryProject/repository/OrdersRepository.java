package com.team3.DeliveryProject.repository;

import com.team3.DeliveryProject.entity.Orders;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrdersRepository extends JpaRepository<Orders, Long> {
    long countByModifiedDateBetweenAndStatusIn(LocalDateTime start, LocalDateTime end, List<String> statuses);
    List<Orders> findAllByStoreId(Long storeId);
}
