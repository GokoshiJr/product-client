import React, {useState} from "react";
import { Routes, Route, Link } from "react-router-dom";
import ProductLayout from "./Product/components/ProductLayout";
import Box from '@mui/material/Box';
import { TextField, Container, CssBaseline, Button, Grid } from '@mui/material';
import axios from 'axios';
const baseUrl = process.env.REACT_APP_BASE_URL;

function App() {
  return (
    <div className="App">
      <h1>Welcome to React Router!</h1>
      <nav>
        <Link to="/login">Login</Link>
        <Link to="products">Products</Link>
      </nav>
      <Routes>
        <Route path="/products" element={<ProductLayout />} />
        <Route path="/login" element={<Login />} />
      </Routes>

    </div>
  );
}

function Login() {

    const handleSubmit = (data) => {
      console.log(data);
      axios.post(`${baseUrl}/auth/signin`, data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
    }

    const [formValues, setFormValues] = useState({
      email: '',
      password: ''
    });

    const handleChange = (event) => {
      const { name, value } = event.target
      setFormValues({...formValues, [name]: value});
    }



    const _handleSubmit = (event) => {
      event.preventDefault();
      handleSubmit({...formValues});
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
                id="email"
                label="Email"
                margin="normal"
                required
                fullWidth
                name="email"
                autoFocus
                value={formValues.email}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                id="password"
                type="password"
                autoFocus
                value={formValues.password}
                onChange={handleChange}
              />

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
                  Login
                </Button>

              </Grid>

            </Box>
          </Box>
        </Container>
    );
}

export default App;
