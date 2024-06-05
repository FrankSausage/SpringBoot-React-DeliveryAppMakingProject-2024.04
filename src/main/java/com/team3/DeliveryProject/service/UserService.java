package com.team3.DeliveryProject.service;

import com.team3.DeliveryProject.dto.common.Response;
import com.team3.DeliveryProject.dto.request.user.UserFavoriteListRequestDto;
import com.team3.DeliveryProject.dto.request.user.UserFavoriteRequestDto;
import com.team3.DeliveryProject.dto.response.user.UserFavoriteListResponseDto;
import com.team3.DeliveryProject.entity.Users;
import org.springframework.http.ResponseEntity;
import org.springframework.web.ErrorResponse;

public interface UserService {

    public ResponseEntity<Response> signUp(Users user);

    public ResponseEntity<Response> updateUser(Users user);

    public ResponseEntity<Response> deleteUser(Users user);

    public ResponseEntity<Response> favorite(UserFavoriteRequestDto requestDto);

    UserFavoriteListResponseDto getFavoriteList(UserFavoriteListRequestDto requestDto);
}
