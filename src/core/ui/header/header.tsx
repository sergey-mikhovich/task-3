import React from 'react';
import AccountCircle from '@mui/icons-material/AccountCircle';
import StorefrontOutlined from '@mui/icons-material/StorefrontOutlined';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import CircularProgress from "@mui/material/CircularProgress";

type Profile = {
    firstName: string
    lastName: string
    email: string
    username: string
    image: string
}

export type HeaderProps = {
    onLogout: () => void
    onMain: () => void
    onLogin: () => void
    profile?: Profile
    isLoading: boolean
}

export const Header = ({onLogout, onMain, onLogin, profile, isLoading}: HeaderProps) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOnLogout = () => {
        onLogout()
        handleClose()
    };

    return (
        <AppBar elevation={2}>
            <Toolbar>
                <Box display={"flex"} alignItems={"center"} flex={1}>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="Logo"
                        sx={{ mr: 2 }}
                        onClick={onMain}
                    >
                        <StorefrontOutlined />
                    </IconButton>

                    <Typography
                        variant="h6"
                        component="h2"
                        sx={{ cursor: 'pointer' }}
                    >
                        Shop App
                    </Typography>
                </Box>

                { profile ? (
                    <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' } }}>
                            {profile.firstName} {profile.lastName}
                        </Typography>
                        <IconButton
                            size="large"
                            aria-label="Account menu"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                            sx={{ mr: -1.5 }}
                        >
                            {profile.image ? (
                                <Avatar src={profile.image} alt={profile.username} sx={{ width: 32, height: 32}}/>
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
                                    {profile.email}
                                </Typography>
                            </MenuItem>
                            <MenuItem onClick={handleOnLogout}>Log out</MenuItem>
                        </Menu>
                    </Box>
                ) : (
                    <>
                        { isLoading
                            ? <CircularProgress size={24} sx={{color: "inherit", marginRight: 0.5}} />
                            : <Button color="inherit" sx={{mr: -1}} onClick={onLogin}>Log In</Button>
                        }
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};