package com.team3.DeliveryProject.repository;

import com.team3.DeliveryProject.entity.OrderMenu;
import com.team3.DeliveryProject.entity.Orders;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderMenuRepository extends JpaRepository<OrderMenu, Long> {

    List<OrderMenu> findAllByOrderId(Long orderId);
}
