package com.team3.DeliveryProject.responseCode;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ResponseCode {
    USER_SIGNUP_SUCCESS(HttpStatus.OK, "회원가입 성공"),
    USER_UPDATE_SUCCESS(HttpStatus.OK, "회원수정 성공"),
    USER_DELETE_SUCCESS(HttpStatus.OK, "회원삭제 성공"),
    USER_DIBS_SUCCESS(HttpStatus.OK, "찜 등록/취소/수정 성공"),
    ADDRESS_ADD_SUCCESS(HttpStatus.OK, "주소 추가 성공"),
    STORE_ADD_SUCCESS(HttpStatus.OK, "가게 추가 성공"),
    STORE_UPDATE_SUCCESS(HttpStatus.OK, "가게 수정 성공"),
    STORE_DELETE_SUCCESS(HttpStatus.OK, "가게 삭제 성공"),
    MENU_ADD_SUCCESS(HttpStatus.OK, "메뉴 추가 성공"),
    MENU_UPDATE_SUCCESS(HttpStatus.OK, "메뉴 수정 성공"),
    MENUOPTION_UPDATE_SUCCESS(HttpStatus.OK, "메뉴 옵션 수정 성공"),
    MENUSTATUS_UPDATE_SUCCESS(HttpStatus.OK, "메뉴 품절 여부 수정 성공"),
    MENU_DELETE_SUCCESS(HttpStatus.OK, "메뉴 삭제 성공"),
    MENUOPTION_DELETE_SUCCESS(HttpStatus.OK, "메뉴 옵션 삭제 성공"),
    MENUOPTION_ADD_SUCCESS(HttpStatus.OK, "메뉴옵션 추가 성공"),
    ADDRESS_MODIFY_SUCCESS(HttpStatus.OK, "주소 수정 성공"),
    ADDRESS_DELETE_SUCCESS(HttpStatus.OK, "주소 삭제 성공"),
    ADDRESS_CHANGE_SUCCESS(HttpStatus.OK, "주소 변경 성공"),
    REVIEW_ADD_SUCCESS(HttpStatus.OK, "리뷰 등록 성공"),
    REVIEW_DELETE_SUCCESS(HttpStatus.OK, "리뷰, 사장님 리뷰 삭제 성공"),
    CEO_REVIEW_DELETE_SUCCESS(HttpStatus.OK, "사장님 리뷰 삭제 성공"),
    CEO_REVIEW_ADD_SUCCESS(HttpStatus.OK, "사장님 리뷰 등록 성공"),
    ORDER_ADD_SUCCESS(HttpStatus.OK, "주문 추가 성공"),
    ORDER_STATUS_UPDATE_SUCCESS(HttpStatus.OK, "주문 상태 수정 성공"),
    ORDER_DELETE_SUCCESS(HttpStatus.OK, "주문 삭제 성공"),
    ORDER_STATUS_DETAIL_SUCCESS(HttpStatus.OK, "주문상태 상세 조회 성공"),
    CART_ADD_SUCCESS(HttpStatus.OK, "주문 메뉴 추가 성공"),
    CART_UPDATE_SUCCESS(HttpStatus.OK, "주문 메뉴 개수 수정 성공"),
    CART_DELETE_ALL_SUCCESS(HttpStatus.OK, "주문 메뉴 전체 삭제 성공"),
    CART_DELETE_SUCCESS(HttpStatus.OK, "주문 메뉴 단건 삭제 성공");

    private final HttpStatus httpStatus;
    private final String detail;
}
