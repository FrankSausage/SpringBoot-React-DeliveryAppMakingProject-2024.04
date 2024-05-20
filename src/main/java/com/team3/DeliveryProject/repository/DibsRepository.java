package com.team3.DeliveryProject.repository;

import com.team3.DeliveryProject.entity.Dibs;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface DibsRepository extends JpaRepository<Dibs, Long> {
    @Query("SELECT CASE WHEN COUNT(d) > 0 THEN true ELSE false END FROM Dibs d WHERE d.userId = :userId AND d.storeId = :storeId")
    boolean existsByUserIdAndStoreId(@Param("userId") Long userId, @Param("storeId") Long storeId);
}
