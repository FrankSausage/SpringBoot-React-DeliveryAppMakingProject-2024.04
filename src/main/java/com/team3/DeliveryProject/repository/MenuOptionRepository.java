package com.team3.DeliveryProject.repository;

import com.team3.DeliveryProject.entity.Address;
import com.team3.DeliveryProject.entity.MenuOption;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MenuOptionRepository  extends JpaRepository<MenuOption, Long> {
    List<MenuOption> findAllByMenuId(Long menuId);

}
