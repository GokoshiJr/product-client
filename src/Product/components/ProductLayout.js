import React, { useState, useEffect } from 'react';
import Header from './Header';
import AddButton from './AddButton';
import { Container } from '@mui/material';
import Grid from '@mui/material/Grid';
import ListProducts from './ListProducts';
import Form from './Form';
import { getProducts } from '../services/index';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { createProduct, deleteProduct } from '../services/index';

function ProductLayout() {

  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);

  async function loadProducts() {
    const response = await getProducts();
    if (response.status === 200) {
      setProducts(response.data);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    loadProducts();
  }, []);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  const handleSubmit = async (data) => {
    await createProduct(data);
    loadProducts();
    handleClose();
  }

  const handleDelete = async (data) => {
    console.log(data);
    await deleteProduct(data);
    loadProducts();
  }

  return (
    <Container>
      <Grid container spacing={2}>

        <Grid item xs={12} md={12}>
          <Header title={"Products"} />
        </Grid>

        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          marginTop={2}
        >
          <AddButton title={"Add Product"} onClick={handleClickOpen} />
        </Grid>

        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          marginTop={2}
        >
          <ListProducts
            isLoading={isLoading}
            products={products}
            handleDelete={handleDelete}
          />
        </Grid>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add new product</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Add new product to the list.
            </DialogContentText>
            <Form
              handleClose={handleClose}
              handleSubmit={handleSubmit}
            />
          </DialogContent>
        </Dialog>

      </Grid>
    </Container>
  );
}

export default ProductLayout;
