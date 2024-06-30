import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { fetchProductDetails } from '../../api_services/product';
const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

const DetailProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = React.useState(null);

  React.useEffect(() =>{
    const loadProductDetails = async() =>{
      try{
        const data = await fetchProductDetails(id)
        setProduct(data);
      }catch (error){
        setError(error.message);
        console.error('Error fetching data:', error);
      }
    };
    loadProductDetails();
  }, [id]);

  if (!product) {
    return <Box sx={{ display: 'flex' ,justifyContent:"center" }}>
    <CircularProgress />
  </Box>
  }

  return (
    <Paper
      sx={{
        p: 4,
        margin: 'auto',
        width: '76%',
        height: '70vh',
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      }}
    >
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 400, height: 500 }}>
            <Img alt={product.name} src={product.img_url} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={4}>
            <Box sx={{ ml: "4%", mt: "8vh" }}>
              <Typography gutterBottom variant="h4" component="div">
                {product.name}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Origin: {product.origin || 'Unknown'}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Packaging: {product.packaging || 'No packaging information'}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Price: {product.price ? `${product.price} VND` : 'No price'}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Description: {product.description || 'No description'}
              </Typography>
            </Box>
            <Box sx={{ ml: "4%", mt: "8vh", display: 'flex', alignItems: 'center' }}>
              <TextField
                label="Quantity"
                type="number"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                size="medium"
                sx={{ width: '40%' }}
              />
              <Button variant="contained" sx={{ height: '56px', ml: 2, backgroundColor: "#006F45" }}>
                <AddShoppingCartIcon sx={{ mr: 1 }} />
                Add to cart
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default DetailProduct;
