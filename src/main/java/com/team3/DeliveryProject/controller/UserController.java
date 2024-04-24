package com.team3.DeliveryProject.controller;

import com.team3.DeliveryProject.dto.UsersDto;
import com.team3.DeliveryProject.dto.request.UserRequestDto;
import com.team3.DeliveryProject.entity.Users;
import com.team3.DeliveryProject.service.UserService;
import java.util.Locale.Builder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody UserRequestDto userRequestDto) {
        System.out.println("컨트롤러 진입");

        Users users = new Users(userRequestDto.getUserId(),userRequestDto.getPassword(),userRequestDto.getName(),userRequestDto.getPhone(),
            userRequestDto.getEmail(),0,userRequestDto.getRole(),userRequestDto.getCurrentAddress(),"일반",0);
        System.out.println(users);
        System.out.println("!@@!@#W@!!@#@!#@!#@!#!@#");
        userService.signUp(users);
        return ResponseEntity.ok().body("User registered successfully");
    }

//    @PostMapping("/signup")
//    public ResponseEntity<?> signUp(String userId, String password, String name, String phone, String email, String role, String currentAddress) {
//        System.out.println("컨트롤러 진입");
//
//        System.out.println(userId);
//        System.out.println(password);
//        System.out.println(name);
//        System.out.println(phone);
//        System.out.println(email);
//        System.out.println(role);
//        System.out.println(currentAddress);
//        return ResponseEntity.ok().body("User registered successfully");
//    }
}
