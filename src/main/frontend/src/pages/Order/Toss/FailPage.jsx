import { Box, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";

export function Fail() {
  const [ searchParams ] = useSearchParams()

  return (
    <Box>
      <Typography>결제 실패</Typography>
      <Typography>사유: {searchParams.get('message')}</Typography>
    </Box>
  );
}