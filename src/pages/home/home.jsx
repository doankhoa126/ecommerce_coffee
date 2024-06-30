import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea, Grid, Pagination } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProducts } from '../../api_services/product';

export default function HomePage() {
    const [products, setProducts] = React.useState([]);
    const [totalProducts, setTotalProducts] = React.useState(0);
    const [error, setError] = React.useState(null);
    const { pageParams } = useParams();
    const navigate = useNavigate();

    // Default values
    let currentPage = 1;
    let perPage = 3;

    if (pageParams) {
        const params = pageParams.split('&').map(Number);
        if (params.length === 2) {
            currentPage = params[0];
            perPage = params[1];
        }
    }

    React.useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await fetchProducts(currentPage, perPage);
                setProducts(data.products);
                setTotalProducts(data.totalProducts);
            } catch (error) {
                setError(error.message);
                console.error('Error fetching data:', error);
            }
        };

        loadProducts();
    }, [currentPage, perPage]);

    function formatPrice(price) {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    }

    const handlePageChange = (event, value) => {
        navigate(`/home/${value}&${perPage}`);
    };

    const handleProductClick = (productId) => {
        navigate(`/product-detail/${productId}`);
    };

    return (
        <Box sx={{ width: "80%", margin: "0 auto", mb: "40px" }}>
            <Box component="img"
                src="https://asplynrorebnsajukbnu.supabase.co/storage/v1/object/public/image_coffee_web/slideshow.webp?t=2024-06-20T03%3A41%3A26.881Z"
                alt="Slideshow"
                sx={{
                    width: "100%",
                    height: "auto",
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 2 }}>
                <Typography sx={{ fontSize: "30px", fontWeight: 'bold' }}>
                    New Products
                </Typography>
            </Box>
            {error ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 2 }}>
                    <Typography color="error">Error: {error}</Typography>
                </Box>
            ) : (
                <>
                    <Grid container spacing={3} sx={{ marginTop: 2 }}>
                        {products.map((product, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Card sx={{ height: '100%' }}>
                                    <CardActionArea onClick={() => handleProductClick(product.id)}>
                                        <CardMedia
                                            component="img"
                                            sx={{ height: 200 }}
                                            image={product.img_url || 'default-image-url.jpg'}
                                            alt={product.name || 'No name available'}
                                        />
                                        <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {product.name || 'No name available'}
                                            </Typography>
                                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                                <Typography color="text.secondary" sx={{ fontSize: "24px" }}>
                                                    {product.price ? formatPrice(product.price) : 'No price available'}
                                                </Typography>
                                                <Box>
                                                    <FavoriteBorderIcon />
                                                    <AddShoppingCartIcon sx={{ ml: "10px" }} />
                                                </Box>
                                            </Box>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 2 }}>
                        <Pagination
                            count={Math.ceil(totalProducts / perPage)}
                            page={currentPage}
                            onChange={handlePageChange}
                            color="primary"
                        />
                    </Box>
                </>
            )}
        </Box>
    );
}
