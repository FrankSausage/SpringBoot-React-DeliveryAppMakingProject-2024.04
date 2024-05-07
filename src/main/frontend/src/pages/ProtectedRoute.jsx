import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = useAuthContext();
  if (!user){
    alert('로그인이 필요합니다.')
    return <Navigate to='/signIn' replace={true} />
  }

  return children;
}