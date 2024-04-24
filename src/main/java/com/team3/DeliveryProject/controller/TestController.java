package com.team3.DeliveryProject.controller;


import com.team3.DeliveryProject.entity.Users;
import com.team3.DeliveryProject.service.Test;
import com.team3.DeliveryProject.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/test")
public class TestController {
    @Autowired
    private Test test;
    @Autowired
    private UserService userService;

    @GetMapping("/test")
    public String test() {
        test.findTest();
        return "test/test";
    }

    @PostMapping("/signup")
    public void testSignUp(){
        System.out.println("컨트롤러 진입");
        Users users1 = new Users(2L," ","유기준","01012","kijun@naver.com",0,"회원",
            "수원시 팔달구 인계동 다 내땅", "일반",0);
        Users users2 = new Users(1L," ","유기준","01012","kijun2@naver.com",0,"회원",
            "수원시 팔달구 인계동 다 내땅", "일반",0);
        Users users3 = new Users(3L," ","유기준","01012","kijun@naver.com",0,"회원",
            "수원시 팔달구 인계동 다 내땅", "일반",0);
        Users users4 = new Users(4L," ","유기준","01012","kijun4@naver.com",0,"회원",
            "수원시 팔달구 인계동 다 내땅", "일반",0);
        Users users5 = new Users(5L," ","유기준","01012","kijun5@naver.com",0,"회원",
            "수원시 팔달구 인계동 다 내땅", "일반",0);

//        userService.signUp(users1);
//        userService.signUp(users2);
//        userService.signUp(users3);
//        userService.signUp(users4);
        userService.signUp(users5);
    }
}
