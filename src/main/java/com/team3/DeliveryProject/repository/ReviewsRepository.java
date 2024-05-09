package com.team3.DeliveryProject.repository;

import com.team3.DeliveryProject.entity.Menu;
import com.team3.DeliveryProject.entity.Reviews;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewsRepository  extends JpaRepository<Reviews, Long> {
    List<Reviews> findAllByStoreId(Long storeId);
}
