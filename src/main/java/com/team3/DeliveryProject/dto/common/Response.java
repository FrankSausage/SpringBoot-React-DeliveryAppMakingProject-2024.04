package com.team3.DeliveryProject.dto.common;

import com.team3.DeliveryProject.responseCode.ErrorCode;
import com.team3.DeliveryProject.responseCode.ResponseCode;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;
import org.springframework.http.ResponseEntity;

@Getter
public class Response {

    private final String timestamp = String.valueOf(LocalDateTime.now());
    private final Integer status;
    private final String message;
    private final Long dataId; // 새로운 필드 추가

    @Builder
    public Response(Integer status, String message, Long dataId) { // 새로운 생성자
        this.status = status;
        this.message = message;
        this.dataId = dataId;
    }

    @Builder
    public Response(Integer status, String message) { // 기존 생성자
        this.status = status;
        this.message = message;
        this.dataId = null;
    }

    public static ResponseEntity<Response> toResponseEntity(ResponseCode responseCode) {
        return ResponseEntity
            .status(responseCode.getHttpStatus())
            .body(Response.builder()
                .status(responseCode.getHttpStatus().value())
                .message(responseCode.getDetail())
                .build()
            );
    }

    public static ResponseEntity<Response> toResponseEntity(ErrorCode errorCode) {
        return ResponseEntity
            .status(errorCode.getHttpStatus())
            .body(Response.builder()
                .status(errorCode.getHttpStatus().value())
                .message(errorCode.getDetail())
                .build()
            );
    }

    // 새로운 메서드 추가
    public static ResponseEntity<Response> toResponseEntity(ResponseCode responseCode, Long dataId) {
        return ResponseEntity
            .status(responseCode.getHttpStatus())
            .body(Response.builder()
                .status(responseCode.getHttpStatus().value())
                .message(responseCode.getDetail())
                .dataId(dataId)
                .build()
            );
    }
}
