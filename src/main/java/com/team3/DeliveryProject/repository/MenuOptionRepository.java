package com.team3.DeliveryProject.repository;

import com.team3.DeliveryProject.entity.MenuOption;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MenuOptionRepository  extends JpaRepository<MenuOption, Long> {
}
