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

    @Builder
    public Response(Integer status, String message) {
        this.status = status;
        this.message = message;
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
}
