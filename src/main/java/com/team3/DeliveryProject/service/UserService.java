package com.team3.DeliveryProject.service;

import com.team3.DeliveryProject.dto.common.Response;
import com.team3.DeliveryProject.entity.Users;
import org.springframework.http.ResponseEntity;

public interface UserService {
    public ResponseEntity<Response> signUp(Users user);
    public ResponseEntity<Response> updateUser(Users user);
}
