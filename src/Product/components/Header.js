import React from 'react';
import Typography from '@mui/material/Typography';

function Header({ title }) {
  return (
    <Typography
      component="h1"
      variant="h2"
      align="center"
      color="text.primary"
      marginTop={4}
      gutterBottom
    >
      { title }
    </Typography>
  )
}

export default Header;
