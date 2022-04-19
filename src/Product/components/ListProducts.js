import React from 'react';
import Loading from './Loading';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

function ListProducts(
  {
    isLoading,
    products,
    handleDelete,
    openDeleteModal,
    handleCloseDeleteModal,
  }
){

  if (isLoading) {
    return <Loading />
  }

  if (!products.length) {
    return <h2>You don't have products</h2>
  } else {
    return (
      <>
        {products.map((product) => (
          <Card sx={{ minWidth: 345, m: 2 }} key={product._id}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={product.imgUrl}
                alt={product.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  { product.title }
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  { product.description }
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Edit
              </Button>
              <Button size="small" color="primary" onClick={() => handleDelete(product)}>
                Delete
              </Button>
            </CardActions>
          </Card>
        ))}
      </>
    )
  }

}

export default ListProducts;
