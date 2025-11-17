import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import CardActionArea from '@mui/material/CardActionArea';
import Pagination from '@mui/material/Pagination';
import Alert from "@mui/material/Alert";
import Backdrop from '@mui/material/Backdrop';
import {useAppNavigate} from "@/core/hooks/use-app-navigate";
import {calculateDiscountPrice} from "@/core/utils/calculate-discount-price";
import {useProductsPagination} from "@/modules/products/hooks/useProductsPagination";

export const ProductsList = () => {
    const {toProductDetail} = useAppNavigate()
    const {products, page, totalPages, goToPage, error, isFetching, isLoading} = useProductsPagination()

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        goToPage(page)
        window.scrollTo({top: 0, behavior: 'smooth'})
    }

    if (error) {
        return (
            <Container sx={{ mt: 4 }}>
                <Alert severity="error">
                    An error occurred while loading data. Please try again later.
                </Alert>
            </Container>
        );
    }

    return (
        <Container sx={{ py: 4, position: 'relative' }}>
            <Typography variant={"h4"} component={"h1"} fontWeight={"bold"}>
                Catalog
            </Typography>

            <Backdrop
                open={isFetching && !isLoading}
                sx={{
                    position: 'absolute',
                    zIndex: 1,
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(1px)'
                }}
            />

            <Grid container spacing={3} marginTop={4}>
                {products.map((product) => {
                    const discountedPrice = calculateDiscountPrice(product.price, product.discountPercentage, 2)

                    return (
                        <Grid size={{ xs: 12, sm: 6, md: 4}} key={product.id} component={"article"}>
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
                                <CardActionArea onClick={() => toProductDetail(String(product.id))}>
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
                                        <Typography gutterBottom variant="h6" component="h2">
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
                                            <Box display={"flex"} alignItems={"end"} gap={1}>
                                                <Typography
                                                    variant="h5"
                                                    component="h3"
                                                    color="primary"
                                                    fontWeight="bold"
                                                >
                                                    ${discountedPrice}
                                                </Typography>
                                                <Typography
                                                    color="text.secondary"
                                                    component="h4"
                                                    sx={{ textDecoration: 'line-through' }}
                                                >
                                                    ${product.price}
                                                </Typography>
                                            </Box>
                                            <Typography variant="body2" color="text.secondary">
                                                ⭐ {product.rating}
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>

            { totalPages > 1 && (
                <Box display="flex" justifyContent="center" mt={4}>
                    <Pagination
                        count={totalPages}
                        shape={"rounded"}
                        page={page}
                        onChange={handlePageChange}
                        color="primary"
                        size="medium"
                    />
                </Box>
            )}
        </Container>
    )
}