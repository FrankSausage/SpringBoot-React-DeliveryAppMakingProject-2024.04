package com.team3.DeliveryProject.repository;

import com.team3.DeliveryProject.entity.CeoReviews;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CeoReviewsRepository  extends JpaRepository<CeoReviews, Long> {
}
