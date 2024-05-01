package com.team3.DeliveryProject.responseCode;

import static org.springframework.http.HttpStatus.*;
import org.springframework.http.HttpStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    USERNAME_IS_ALREADY_EXIST(BAD_REQUEST, "중복된 이름이 존재합니다."),
    USER_EMAIL_IS_ALREADY_EXIST(BAD_REQUEST, "중복된 이메일 주소입니다."),
    COMPANY_IS_ALREADY_EXIST(BAD_REQUEST, "중복된 회사 이름이 존재합니다."),
    INFO_IS_INCORRECT(BAD_REQUEST, "올바르지 않은 정보가 있습니다"),
    STORE_UPDATE_FAIL(BAD_REQUEST,"해당 가게의 점주만 업데이트 할 수 있습니다."),
    STORE_DELETE_FAIL(BAD_REQUEST,"해당 가게의 점주만 가게를 삭제 할 수 있습니다."),
    COMPANY_INFO_NOT_FOUND(NOT_FOUND, "해당 회사 정보가 존재하지 않습니다."),
    WELFARE_INFO_NOT_FOUND(NOT_FOUND, "해당 회사의 복지 정보가 존재하지 않습니다."),
    LOGIN_ID_OR_PASSWORD_NOT_THE_SAME(BAD_REQUEST, "로그인 정보가 올바르지 않습니다."),
    ALREADY_EXIST_COMPANY(BAD_REQUEST, "이미 존재하는 회사입니다."),
    COMMENT_INFO_NOT_FOUND(NOT_FOUND, "존재하지 않는 댓글입니다."),
    AUTHENTICATION_NOT_FOUND(UNAUTHORIZED, "인증이 필요합니다."),
    TOKEN_EXPIRED_EXCEPTION(UNAUTHORIZED, "유효하지 않은 토큰입니다."),
    SQL_EXCEPTION(BAD_REQUEST, "SQL_EXCEPTION");
    private final HttpStatus httpStatus;
    private final String detail;
}
