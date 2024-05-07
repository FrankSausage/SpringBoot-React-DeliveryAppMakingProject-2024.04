package com.team3.DeliveryProject.responseCode;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ResponseCode {
    USER_SIGNUP_SUCCESS(HttpStatus.OK, "회원가입 성공"),
    USER_UPDATE_SUCCESS(HttpStatus.OK, "회원수정 성공"),
    USER_DELETE_SUCCESS(HttpStatus.OK,"회원삭제 성공"),
    ADDRESS_ADD_SUCCESS(HttpStatus.OK,"주소 추가 성공"),
    STORE_ADD_SUCCESS(HttpStatus.OK,"가게 추가 성공"),
    STORE_UPDATE_SUCCESS(HttpStatus.OK,"가게 수정 성공"),
    STORE_DELETE_SUCCESS(HttpStatus.OK,"가게 삭제 성공"),
    MENU_ADD_SUCCESS(HttpStatus.OK,"메뉴 추가 성공"),
    MENUOPTION_ADD_SUCCESS(HttpStatus.OK,"메뉴옵션 추가 성공"),
    ADDRESS_MODIFY_SUCCESS(HttpStatus.OK,"주소 수정 성공"),
    ADDRESS_DELETE_SUCCESS(HttpStatus.OK,"주소 삭제 성공"),
    ADDRESS_CHANGE_SUCCESS(HttpStatus.OK, "주소 변경 성공"),
    USER_INFO_UPDATE_SUCCESS(HttpStatus.OK, "계정정보 변경 성공"),
    ACCESS_TOKEN_IS_VALID(HttpStatus.OK, "유효한 토큰입니다"),
    COMPANY_CREATE_SUCCESS(HttpStatus.OK, "회사정보 생성 성공"),
    COMPANY_UPDATE_SUCCESS(HttpStatus.OK, "회사정보 수정 성공"),
    COMPANY_DELETE_SUCCESS(HttpStatus.OK, "회사정보와 연관된 복지정보 삭제 성공"),
    WELFARE_CREATE_SUCCESS(HttpStatus.OK, "복지정보 생성 성공"),
    WELFARE_MODIFIED_SUCCESS(HttpStatus.OK, "복지정보 수정 성공"),
    WELFARE_DELETE_SUCCESS(HttpStatus.OK, "복지정보 삭제 성공"),
    COMMENT_CREATE_SUCCESS(HttpStatus.OK, "댓글 생성 성공"),
    COMMENT_DELETE_SUCCESS(HttpStatus.OK, "댓글 삭제 성공"),
    FAVORITE_SUCCESS(HttpStatus.OK, "성공"),
    FAVORITE_CANCEL_SUCCESS(HttpStatus.OK, "취소");

    private final HttpStatus httpStatus;
    private final String detail;
}
