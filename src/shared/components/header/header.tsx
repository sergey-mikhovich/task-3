import React from 'react';
import AccountCircle from '@mui/icons-material/AccountCircle';
import StorefrontOutlined from '@mui/icons-material/StorefrontOutlined';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {useNavigate} from "react-router-dom";
import {useMeQuery} from "@/features/auth/auth-api";
import {baseApi} from "@/shared/api/base-api";
import {useAppDispatch} from "@/shared/hooks/use-app-dispatch";
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import CircularProgress from "@mui/material/CircularProgress";

export const Header = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {data: user, isLoading} = useMeQuery()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        dispatch(baseApi.util.resetApiState())
        handleClose()
    };

    const navigateToMain = () => {
        navigate(user ? "/products" : "/auth/login");
    }

    return (
        <AppBar position="sticky" elevation={2}>
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="logo"
                    sx={{ mr: 2 }}
                    onClick={navigateToMain}
                >
                    <StorefrontOutlined />
                </IconButton>

                <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1, cursor: 'pointer' }}
                    onClick={navigateToMain}
                >
                    Shop App
                </Typography>

                { user ? (
                    <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' } }}>
                            {user.firstName} {user.lastName}
                        </Typography>
                        <IconButton
                            size="large"
                            aria-label="account menu"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            {user.image ? (
                                <Avatar src={user.image} alt={user.username} sx={{ width: 32, height: 32 }} />
                            ) : (
                                <AccountCircle />
                            )}
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem disabled>
                                <Typography variant="body2" color="text.secondary">
                                    {user.email}
                                </Typography>
                            </MenuItem>
                            <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                        </Menu>
                    </Box>
                ) : (
                    <>
                        {isLoading && <CircularProgress size={24} sx={{color: "white"}} /> }
                        {!isLoading && (
                            <Button color="inherit" onClick={() => navigate('auth/login')}>
                                Log In
                            </Button>
                        )}
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};