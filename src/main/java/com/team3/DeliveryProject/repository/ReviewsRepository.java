package com.team3.DeliveryProject.repository;

import com.team3.DeliveryProject.entity.Reviews;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewsRepository extends JpaRepository<Reviews, Long> {
    List<Reviews> findAllByUserId(Long userId);
}
