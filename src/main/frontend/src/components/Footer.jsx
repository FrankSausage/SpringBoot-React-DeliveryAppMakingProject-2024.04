import * as React from 'react';
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function footer(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          HumanD
        </Link>{' '}
        {new Date().getFullYear()}
        {'.' + '04'}
      </Typography>
    );
  }