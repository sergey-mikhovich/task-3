import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import Pagination from "@mui/material/Pagination";
import {useGetProductsQuery} from "@/features/products/products-api";
import {ChangeEvent, useState} from "react";

export const ProductsList = () => {
    const [page, setPage] = useState(1);

    const limit = 15
    const skip = (page - 1) * limit

    const {data} = useGetProductsQuery({limit, skip})

    const totalPages = data ? Math.ceil(data.total / limit) : 0

    const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
        setPage(page)
        window.scroll({top: 0})
    }

    return (
        <Container sx={{ py: 4 }}>
            <Typography variant={"h4"} component={"h1"} gutterBottom fontWeight={"bold"}>
                Products
            </Typography>

            <Grid container spacing={3}>
                {data?.products.map((product, index) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4}} key={product.id}>
                        <Card
                            sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                transition: 'transform 0.2s',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: 6,
                                },
                            }}
                        >
                            <CardMedia
                                component="img"
                                height="200"
                                image={product.thumbnail}
                                alt={product.title}
                                sx={{ objectFit: 'contain' }}
                                fetchPriority='high'
                                loading="eager"
                                decoding="async"
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h6" component="h2" noWrap>
                                    {product.title}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        display: '-webkit-box',
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: 'vertical',
                                        mb: 2,
                                    }}
                                >
                                    {product.description}
                                </Typography>
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Typography variant="h6" color="primary" fontWeight="bold">
                                        ${product.price}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        ⭐ {product.rating}
                                    </Typography>
                                </Box>
                            </CardContent>
                            <CardActions>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    startIcon={<ShoppingCart />}
                                >
                                    Подробнее
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Box display="flex" justifyContent="center" mt={4}>
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                    size="large"
                />
            </Box>
        </Container>
    )
}