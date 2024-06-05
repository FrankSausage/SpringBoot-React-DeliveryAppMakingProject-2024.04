package com.team3.DeliveryProject.repository;

import com.team3.DeliveryProject.entity.Menu;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MenuRepository extends JpaRepository<Menu, Long> {

    List<Menu> findAllByStoreId(Long storeId);
    @Query("SELECT DISTINCT m.storeId FROM Menu m WHERE m.name LIKE %:name%")
    List<Long> findDistinctStoreIdsByContainingName(@Param("name") String name);
}
