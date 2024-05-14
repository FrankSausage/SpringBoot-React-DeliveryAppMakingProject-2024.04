import * as React from 'react';
import PropTypes from 'prop-types';
import ReviewRating from './ReviewRating';
import ReviewList from './ReviewList';
import { Box, Typography, Tab, Tabs, useTheme, AppBar } from '@mui/material';


export default function ReviewReply() {
  
  const [value, setValue] = React.useState(2);
  const [reply, setReply] = React.useState(0);
  const theme = useTheme();

  const handleChange = (event, newValue) => {
    setValue(setReply(newValue));
  };

  const handleRatingChange = (event, newValue) => {
    setValue(newValue);
  }
  const handleChangeIndex = (index) => {
    setReply(index);
  };



  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={reply !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {reply === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }


  return (
  
  <Box sx={{ margin: 0 }}>
      <Box marginBottom={10}>
        <ReviewRating />
      </Box>
      
      <Box>
        <AppBar position="static" color="default">
        <Tabs
          value={reply}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
        </Tabs>
        </AppBar>

        <TabPanel value={reply} index={0} dir={theme.direction}>
          <ReviewList></ReviewList>
        </TabPanel>
        <TabPanel value={reply} index={1} dir={theme.direction}>
          <p>사장 리뷰?</p>
          <p>사장 리뷰 없는 것?</p>
        </TabPanel>
      </Box>
  </Box>
  );
}