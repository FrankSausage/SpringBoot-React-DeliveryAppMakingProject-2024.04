package com.team3.DeliveryProject.repository;

import com.team3.DeliveryProject.entity.Address;
import com.team3.DeliveryProject.entity.Stores;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface StoresRepository  extends JpaRepository<Stores, Long> {

    @Query("SELECT s FROM Stores s WHERE s.userId = :userId AND s.status <> '삭제'")
    List<Stores> findAllByUserId(@Param("userId") Long userId);

    @Query("SELECT s FROM Stores s WHERE s.category LIKE %:category% AND s.status <> '삭제'")
    List<Stores> findByCategoryContaining(@Param("category") String category);

    @Query("SELECT s FROM Stores s WHERE s.name LIKE %:name% AND s.status <> '삭제'")
    List<Stores> findByNameContaining(@Param("name") String name);
}
