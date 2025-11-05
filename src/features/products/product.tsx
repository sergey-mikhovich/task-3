import { useState } from "react";
import { useGetProductByIdQuery } from "./products-api";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import ArrowBack from "@mui/icons-material/ArrowBack";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Rating from "@mui/material/Rating";
import Chip from "@mui/material/Chip";
import Inventory from "@mui/icons-material/Inventory";
import LocalShipping from "@mui/icons-material/LocalShipping";

export const Product = () => {
    const [selectedImage, setSelectedImage] = useState(0);

    const { data: product, isLoading, error } = useGetProductByIdQuery(10);

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                <CircularProgress size={60} />
            </Box>
        );
    }

    if (error || !product) {
        return (
            <Container sx={{ mt: 4 }}>
                <Alert severity="error">
                    Не удалось загрузить информацию о товаре
                </Alert>
                <Button
                    startIcon={<ArrowBack />}
                    sx={{ mt: 2 }}
                >
                    Вернуться к каталогу
                </Button>
            </Container>
        );
    }

    const discountedPrice = product.price * (1 - product.discountPercentage / 100);

    return (
        <Container sx={{ py: 4 }}>
            <Breadcrumbs sx={{ mb: 3 }}>
                <Link
                    underline="hover"
                    color="inherit"
                    sx={{ cursor: 'pointer' }}
                >
                    Товары
                </Link>
                <Typography color="text.primary">{product.title}</Typography>
            </Breadcrumbs>

            <Button
                startIcon={<ArrowBack />}
                sx={{ mb: 3 }}
            >
                Назад к каталогу
            </Button>

            <Grid container spacing={4}>
                <Grid size={{xs: 12, md: 6}}>
                    <Paper elevation={2} sx={{ p: 2 }}>
                        <Box
                            component="img"
                            src={product.images[selectedImage] || product.thumbnail}
                            alt={product.title}
                            sx={{
                                width: '100%',
                                height: { xs: 300, md: 400 },
                                objectFit: 'contain',
                                mb: 2,
                            }}
                        />
                        <Grid container spacing={1}>
                            {product.images.map((img, id) => (
                                <Grid size={{xs: 3}} key={id}>
                                    <Box
                                        component="img"
                                        src={img}
                                        alt={`${product.title} ${id + 1}`}
                                        onClick={() => setSelectedImage(id)}
                                        sx={{
                                            width: '100%',
                                            height: 80,
                                            objectFit: 'contain',
                                            cursor: 'pointer',
                                            border: selectedImage === id ? '2px solid' : '1px solid',
                                            borderColor: selectedImage === id ? 'primary.main' : 'grey.300',
                                            borderRadius: 1,
                                            transition: 'all 0.2s',
                                            '&:hover': {
                                                borderColor: 'primary.main',
                                                opacity: 0.8,
                                            },
                                        }}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Paper>
                </Grid>

                <Grid size={{xs: 12, md: 6}}>
                    <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
                        {product.title}
                    </Typography>

                    <Box display="flex" alignItems="center" gap={2} mb={2}>
                        <Rating value={product.rating} readOnly precision={0.1} />
                        <Typography variant="body2" color="text.secondary">
                            ({product.rating})
                        </Typography>
                    </Box>

                    <Box display="flex" gap={1} mb={3}>
                        <Chip label={product.brand} color="primary" variant="outlined" />
                        <Chip label={product.category} />
                    </Box>

                    <Typography variant="body1" paragraph color="text.secondary">
                        {product.description}
                    </Typography>

                    <Paper elevation={1} sx={{ p: 3, mb: 3, bgcolor: 'grey.50'}}>
                        <Box display="flex" alignItems="flex-end" gap={2} mb={2}>
                            <Typography variant="h3" color="primary" fontWeight="bold">
                                ${discountedPrice.toFixed(2)}
                            </Typography>
                            {product.discountPercentage > 0 && (
                                <>
                                    <Typography
                                        variant="h6"
                                        color="text.secondary"
                                        sx={{ textDecoration: 'line-through' }}
                                    >
                                        ${product.price}
                                    </Typography>
                                    <Chip
                                        label={`-${product.discountPercentage.toFixed(0)}%`}
                                        color="error"
                                        size="small"
                                    />
                                </>
                            )}
                        </Box>

                        <Box display="flex" gap={2} mb={2}>
                            <Box display="flex" alignItems="center" gap={1}>
                                <Inventory fontSize="small" color="action" />
                                <Typography variant="body2">
                                    In stock: {product.stock} шт
                                </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" gap={1}>
                                <LocalShipping fontSize="small" color="action" />
                                <Typography variant="body2">Free delivery</Typography>
                            </Box>
                        </Box>

                        <Button
                            fullWidth
                            variant="contained"
                            size="large"
                            startIcon={<ShoppingCart />}
                            disabled={product.stock === 0}
                            sx={{ py: 1.5 }}
                        >
                            {product.stock === 0 ? 'Нет в наличии' : 'Добавить в корзину'}
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};