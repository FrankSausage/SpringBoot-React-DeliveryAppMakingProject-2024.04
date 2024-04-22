package com.team3.DeliveryProject.controller;


import com.team3.DeliveryProject.service.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/test")
public class TestController {
    private final Logger log = LoggerFactory.getLogger(getClass());
    @Autowired
    private Test test;
    @GetMapping("/test")
    public String test() {
        test.findTest();
        return "test/test";
    }
}
