package com.team3.DeliveryProject.responseCode;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.NOT_ACCEPTABLE;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    USERNAME_IS_ALREADY_EXIST(BAD_REQUEST, "중복된 이름이 존재합니다."),
    USER_EMAIL_IS_ALREADY_EXIST(BAD_REQUEST, "중복된 이메일 주소입니다."),
    STORE_UPDATE_FAIL(BAD_REQUEST, "해당 가게의 점주만 업데이트 할 수 있습니다."),
    STORE_DELETE_FAIL(BAD_REQUEST, "해당 가게의 점주만 가게를 삭제 할 수 있습니다."),
    USER_POINT_LESS_THAN_INPUT(NOT_ACCEPTABLE, "유저의 포인트가 사용포인트보다 적습니다.");
    private final HttpStatus httpStatus;
    private final String detail;
}
