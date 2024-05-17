package com.team3.DeliveryProject.controller;

import com.team3.DeliveryProject.dto.request.user.UserDeleteRequestDto;
import com.team3.DeliveryProject.dto.request.user.UserSignInRequestDto;
import com.team3.DeliveryProject.dto.request.user.UserSignUpRequestDto;
import com.team3.DeliveryProject.dto.request.user.UserUpdateGetRequestDto;
import com.team3.DeliveryProject.dto.request.user.UserUpdatePostRequestDto;
import com.team3.DeliveryProject.dto.response.user.UserSignInRoleOwnerInnerDto;
import com.team3.DeliveryProject.dto.response.user.UserSignInRoleOwnerResponseDto;
import com.team3.DeliveryProject.dto.response.user.UserSignInRoleUserResponseDto;
import com.team3.DeliveryProject.dto.response.user.UserUpdateResponseDto;
import com.team3.DeliveryProject.entity.Stores;
import com.team3.DeliveryProject.entity.Users;
import com.team3.DeliveryProject.repository.StoresRepository;
import com.team3.DeliveryProject.repository.UsersRepository;
import com.team3.DeliveryProject.service.UserService;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

    @Autowired
    private StoresRepository storesRepository;

    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody UserSignUpRequestDto requestDto) {

        Users users = new Users(requestDto.getPassword(), requestDto.getName(),
            requestDto.getPhone(), requestDto.getEmail(), 1, requestDto.getRole(),
            requestDto.getCurrentAddress(), requestDto.getAddressCode(),
            "우리집", 0);
        userService.signUp(users);
        return ResponseEntity.ok().body("User registered successfully");
    }

    @PostMapping("/update")
    public ResponseEntity<?> updateUser(@RequestBody UserUpdatePostRequestDto requestDto) {
        Users user = usersRepository.findById(requestDto.getUserId()).orElseThrow(()->new RuntimeException("User not found"));

        user.setPhone(requestDto.getPhone());
        user.setName(requestDto.getName());
        user.setCurrentAddress(requestDto.getCurrentAddress());
        user.setAddressCode(requestDto.getAddressCode());
        userService.updateUser(user);
        return ResponseEntity.ok().body("User update successfully");
    }

    @GetMapping("/update")
    public ResponseEntity<?> updateUser(@ModelAttribute UserUpdateGetRequestDto requestDto) {
        System.out.println("진입");
        Users user = usersRepository.findUsersByEmail(requestDto.getEmail())
            .orElseThrow(() -> new RuntimeException("User not found"));
        System.out.println(user);
        UserUpdateResponseDto responseDto = UserUpdateResponseDto.builder()
            .userId(user.getUserId())
            .phone(user.getPhone())
            .currentAddress(user.getCurrentAddress())
            .build();
        System.out.println(responseDto);
        return ResponseEntity.ok().body(responseDto);
    }

//    @PostMapping("/update/new")
//    public ResponseEntity<?> updateUser(@RequestBody UserUpdateGetRequestDto requestDto) {
//        System.out.println("진입");
//        Users user = usersRepository.findUsersByEmail(requestDto.getEmail())
//                .orElseThrow(() -> new RuntimeException("User not found"));
//        System.out.println(user);
//        UserUpdateResponseDto responseDto = UserUpdateResponseDto.builder()
//                .phone(user.getPhone())
//                .currentAddress(user.getCurrentAddress())
//                .build();
//        System.out.println(responseDto);
//        return ResponseEntity.ok().body(responseDto);
//    }

    @PostMapping("/delete")
    public ResponseEntity<?> deleteUser(@RequestBody UserDeleteRequestDto requestDto) {
        Users user = usersRepository.findUsersByEmail(requestDto.getEmail())
            .orElseThrow(() -> new RuntimeException("User not found"));

        userService.deleteUser(user);
        return ResponseEntity.ok().body("User delete successfully");
    }

    @GetMapping("/signin")
    public ResponseEntity<?> signIn(@ModelAttribute UserSignInRequestDto requestDto) {
        System.out.println(requestDto);
        System.out.println(requestDto.getEmail());
        Users user = usersRepository.findUsersByEmail(requestDto.getEmail())
            .orElseThrow(() -> new RuntimeException("User not found"));
        if (user.getRole().equals("회원")) {
            UserSignInRoleUserResponseDto responseDto = UserSignInRoleUserResponseDto.builder()
                .currentAddress(user.getCurrentAddress())
                .role(user.getRole())
                .point(user.getPoint())
                .build();
            return ResponseEntity.ok().body(responseDto);
        } else if (user.getRole().equals("점주")) {
            List<Stores> storesList = storesRepository.findAllByUserId(user.getUserId());
            List<UserSignInRoleOwnerInnerDto> innerDtoList = storesList.stream()
                .map(store -> UserSignInRoleOwnerInnerDto.builder()
                    .storeId(store.getStoreId())
                    .storePictureName(store.getStorePictureName())
                    .name(store.getName())
                    .build())
                .collect(Collectors.toList());

            UserSignInRoleOwnerResponseDto responseDto = UserSignInRoleOwnerResponseDto.builder()
                .role(user.getRole())
                .storeList(innerDtoList)
                .build();

            return ResponseEntity.ok().body(responseDto);
        }
        // 대응되는 role이 없는 경우
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid user role");
    }
//    @PostMapping("/update/new")
//    public ResponseEntity<?> updateUsers(@RequestBody UserUpdateGetRequestDto requestDto) {
//        System.out.println("진입");
//        Users user = usersRepository.findUsersByEmail(requestDto.getEmail())
//            .orElseThrow(() -> new RuntimeException("User not found"));
//        System.out.println(user);
//        UserUpdateResponseDto responseDto = UserUpdateResponseDto.builder()
//            .phone(user.getPhone())
//            .currentAddress(user.getCurrentAddress())
//            .build();
//        System.out.println(responseDto);
//        return ResponseEntity.ok().body(responseDto);
//    }
}
