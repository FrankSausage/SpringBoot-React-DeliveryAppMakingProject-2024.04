import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = useAuthContext();
  if (!user) {
    if (window.confirm('먼저 로그인이 필요합니다, 로그인 하시겠습니까?')) {
      return <Navigate to='/SignIn' replace={true} />
    } else {
      return window.history.back();
    }
  }

  return children;
}