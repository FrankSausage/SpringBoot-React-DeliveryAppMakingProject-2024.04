import { Box } from "@mui/material";
import React from "react";
import { useDibs } from "../Hook/useDibs";

export default function Dibs() {
  const email = localStorage.getItem('email')
  const {} = useDibs(email);

  return(
    <Box>
      찜목록
    </Box>
  );
}