import React from 'react';
import Button from '@mui/material/Button';

function AddButton({ title, onClick }) {
  return (
    <Button
      variant="contained"
      onClick={onClick}
    >
      { title }
    </Button>
  )
}

export default AddButton;
