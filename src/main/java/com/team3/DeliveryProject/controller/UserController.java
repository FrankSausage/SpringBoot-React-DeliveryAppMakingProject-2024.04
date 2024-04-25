package com.team3.DeliveryProject.controller;

import com.team3.DeliveryProject.dto.request.user.UserSignUpRequestDto;
import com.team3.DeliveryProject.dto.request.user.UserUpdateGetRequestDto;
import com.team3.DeliveryProject.dto.request.user.UserUpdatePostRequestDto;
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
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private UsersRepository usersRepository;

    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody UserSignUpRequestDto requestDto) {
        System.out.println("컨트롤러 진입");

        Users users = new Users(requestDto.getPassword(),requestDto.getName(),requestDto.getPhone(),
            requestDto.getEmail(),0,requestDto.getRole(),requestDto.getCurrentAddress(),"우리집",0);
        System.out.println(users);
        userService.signUp(users);
        return ResponseEntity.ok().body("User registered successfully");
    }

    @PostMapping("/update")
    public ResponseEntity<?> updateUser(@RequestBody UserUpdatePostRequestDto requestDto){
        System.out.println("컨트롤러 진입");

        Users user = usersRepository.findUsersByEmail(requestDto.getEmail()).get();
        System.out.println(user);

        user.setPhone(requestDto.getPhone());
        user.setName(requestDto.getName());
        user.setPassword(requestDto.getPassword());
        user.setCurrentAddress(requestDto.getCurrentAddress());
        System.out.println("바뀐 유저 출력");
        System.out.println(user);
        userService.updateUser(user);
        return ResponseEntity.ok().body("User update successfully");
    }

    @GetMapping("/update")
    public UserUpdateResponseDto updateUser(String email) {
        System.out.println("컨트롤러 진입");
        Users user = usersRepository.findUsersByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        System.out.println(user);

        UserUpdateResponseDto responseDto = UserUpdateResponseDto.builder()
            .phone(user.getPhone())
            .currentAddress(user.getCurrentAddress())
            .build();
        System.out.println(responseDto);
        return responseDto;
    }

}
