package com.team3.DeliveryProject.repository;

import com.team3.DeliveryProject.entity.Address;
import com.team3.DeliveryProject.entity.Users;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsersRepository extends JpaRepository<Users, Long> {

    Optional<Users> findUsersByUserId(Long userId);
    Optional<Users> findUsersByEmail(String email);
}
