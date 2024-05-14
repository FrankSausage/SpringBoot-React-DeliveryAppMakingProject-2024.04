import * as React from 'react';
import { Box, Rating, Typography, Tab, Tabs, useTheme, AppBar } from '@mui/material';
import SearchHeader from '../../components/SearchHeader';


export default function ReviewRating() {
  
  const [value, setValue] = React.useState(2);


  const handleRatingChange = (event, newValue) => {
    setValue(newValue);
  }

  return (
  
  <Box sx={{ margin: -1 }}>
    <SearchHeader />
      <Box
        sx={{
          '& > legend': { mt: 2 },
        }}
      >
        <Typography component="legend">가게 별점? 평점?</Typography>
        <Rating name="read-only" value={value} readOnly />
        {/* <Typography component="legend">Controlled</Typography>
        <Rating
          name="simple-controlled"
          value={value}
          onChange={handleRatingChange}
        /> */}
      </Box>
  </Box>
  );
}