package com.team3.DeliveryProject.controller;

import com.team3.DeliveryProject.dto.request.user.UserDeleteRequestDto;
import com.team3.DeliveryProject.dto.request.user.UserSignInRequestDto;
import com.team3.DeliveryProject.dto.request.user.UserSignUpRequestDto;
import com.team3.DeliveryProject.dto.request.user.UserUpdateGetRequestDto;
import com.team3.DeliveryProject.dto.request.user.UserUpdatePostRequestDto;
import com.team3.DeliveryProject.dto.response.user.UserSignInResponseDto;
import com.team3.DeliveryProject.dto.response.user.UserUpdateResponseDto;
import com.team3.DeliveryProject.entity.Users;
import com.team3.DeliveryProject.repository.UsersRepository;
import com.team3.DeliveryProject.service.UserService;
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
    @Autowired
    private UsersRepository usersRepository;

    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody UserSignUpRequestDto requestDto) {

        Users users = new Users(requestDto.getPassword(), requestDto.getName(),
            requestDto.getPhone(),
            requestDto.getEmail(), 0, requestDto.getRole(), requestDto.getCurrentAddress(), "우리집",
            0);
        userService.signUp(users);
        return ResponseEntity.ok().body("User registered successfully");
    }

    @PostMapping("/update")
    public ResponseEntity<?> updateUser(@RequestBody UserUpdatePostRequestDto requestDto) {
        Users user = usersRepository.findUsersByEmail(requestDto.getEmail()).get();

        user.setPhone(requestDto.getPhone());
        user.setName(requestDto.getName());
        user.setCurrentAddress(requestDto.getCurrentAddress());
        userService.updateUser(user);
        return ResponseEntity.ok().body("User update successfully");
    }

    @GetMapping("/update")
    public ResponseEntity<?> updateUser(@ModelAttribute UserUpdateGetRequestDto requestDto) {
        System.out.println("진입");
        Users user = usersRepository.findUsersByEmail(requestDto.getEmail()).orElseThrow(() -> new RuntimeException("User not found"));
        System.out.println(user)
        ;

        UserUpdateResponseDto responseDto = UserUpdateResponseDto.builder()
            .phone(user.getPhone())
            .currentAddress(user.getCurrentAddress())
            .build();
        System.out.println(responseDto);
        return ResponseEntity.ok().body(responseDto);
    }

    @PostMapping("/delete")
    public ResponseEntity<?> deleteUser(@RequestBody UserDeleteRequestDto requestDto) {
        Users user = usersRepository.findUsersByEmail(requestDto.getEmail()).orElseThrow(() -> new RuntimeException("User not found"));

        userService.deleteUser(user);
        return ResponseEntity.ok().body("User delete successfully");
    }

    @GetMapping("/signin")
    public ResponseEntity<?> signIn(@ModelAttribute UserSignInRequestDto requestDto) {
        Users user = usersRepository.findUsersByEmail(requestDto.getEmail())
            .orElseThrow(() -> new RuntimeException("User not found"));
        UserSignInResponseDto responseDto = UserSignInResponseDto.builder()
            .currentAddress(user.getCurrentAddress())
            .role(user.getRole())
            .build();
        return ResponseEntity.ok().body(responseDto);
    }
}
