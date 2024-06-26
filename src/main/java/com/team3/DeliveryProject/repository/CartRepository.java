package com.team3.DeliveryProject.repository;

import com.team3.DeliveryProject.entity.Cart;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {

    List<Cart> findAllByUserId(Long userId);

    List<Cart> findAllByUserIdAndStatus(Long userId, String status);

    List<Cart> findAllByUserIdAndSequenceAndStatus(Long userId, int sequence, String status);
}
