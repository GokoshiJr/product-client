/* import React, { useState } from 'react';
import { Box, TextField, Button, Paper } from '@mui/material'
import { Controller, useForm } from "react-hook-form"; */

import React, { useRef, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';


function Form({handleClose, handleSubmit}) {

  const [formValues, setFormValues] = useState({
    title: '',
    unitaryPrice: '',
    size: '',
    description: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormValues({...formValues, [name]: value});
  }

  const inputFileRef = useRef()

  const _handleSubmit = (event) => {
    event.preventDefault();
    handleSubmit({...formValues, image: inputFileRef.current.files[0]});
  }

  return (

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >

          <Box
            component="form"
            sx={
              { mt: 1}
            }
            noValidate
            onSubmit={_handleSubmit}
            autoComplete="off"
          >
            <TextField
              id="title"
              label="Title"
              margin="normal"
              required
              fullWidth
              name="title"
              autoFocus
              value={formValues.name}
              onChange={handleChange}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="size"
              label="Size"
              id="size"
              type="number"
              autoFocus
              value={formValues.size}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="unitaryPrice"
              label="Unitary Price"
              id="unitaryPrice"
              type="number"
              value={formValues.unitaryPrice}
              onChange={handleChange}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="description"
              label="Description"
              id="description"
              autoFocus
              value={formValues.description}
              onChange={handleChange}
            />
            <label>photo</label>
            <input type="file" ref={inputFileRef}/>

            <Grid
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
            >
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 2, mb: 1, mr:2 }}
              >
                Save
              </Button>
              <Button
                onClick={ handleClose }
                variant="contained"
                sx={{ mt: 2, mb: 1, mr: 2 }}
              >
                Close
              </Button>
            </Grid>

          </Box>
        </Box>
      </Container>
  );
}

export default Form;

