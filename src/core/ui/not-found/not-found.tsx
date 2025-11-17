import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Home, SearchOff } from '@mui/icons-material';
import {useAppNavigate} from "@/core/hooks/use-app-navigate";
import Container from "@mui/material/Container";

export function NotFound() {
    const {toProductsList} = useAppNavigate()

    return (
        <Container sx={{height: "100%"}}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 2,
                    height: "100%",
                }}
            >
                <SearchOff sx={{ fontSize: 64, mb: 2, opacity: 0.8}} />

                <Typography
                    variant="h1"
                    sx={{
                        fontSize: { xs: '4rem', sm: '6rem', md: '8rem' },
                        fontWeight: 700,
                        mb: 2,
                        opacity: 0.8
                    }}
                >
                    404
                </Typography>

                <Typography
                    variant="h2"
                    sx={{
                        fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
                        fontWeight: 500,
                        mb: 2,
                        opacity: 0.8
                    }}
                >
                    Page Not Found
                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        fontSize: { xs: '1rem', sm: '1.1rem' },
                        mb: 4,
                        maxWidth: '600px',
                        textAlign: 'center',
                    }}
                >
                    Oops! The page you're looking for doesn't exist.
                </Typography>

                <Button
                    variant="contained"
                    size="large"
                    startIcon={<Home />}
                    sx={{
                        fontWeight: 600,
                        px: 4,
                        py: 1.5
                    }}
                    onClick={() => toProductsList()}
                >
                    Go to catalog
                </Button>
            </Box>
        </Container>
    );
}