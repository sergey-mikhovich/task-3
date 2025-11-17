import LockOutlined from "@mui/icons-material/LockOutlined";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, {useState} from "react";
import {useLoginMutation} from "@/modules/auth";
import {useAppNavigate} from "@/core/hooks/use-app-navigate";

export const Login = () => {
    const [login, {isLoading, error}] = useLoginMutation();
    const {toProductsList} = useAppNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await login({ username, password }).unwrap()
            toProductsList({replace: true});
        } catch (err) {
            console.error('Login failed:', err);
        }
    };

    return (
        <Container maxWidth="xs" sx={{height: "100%", py: {xs: 2, sm: 3}}}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: "100%"
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    <Box
                        sx={{
                            bgcolor: 'primary.main',
                            borderRadius: '50%',
                            lineHeight: 0,
                            p: 1.5,
                            mb: 2,
                        }}
                    >
                        <LockOutlined sx={{ color: 'white', fontSize: 32 }} />
                    </Box>

                    <Typography component="h1" variant="h5" gutterBottom>
                        Log in
                    </Typography>

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3, textAlign: 'center' }}>
                        emilys / emilyspass
                    </Typography>

                    {error && (
                        <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                            Incorrect username or password
                        </Alert>
                    )}

                    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            disabled={isLoading}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isLoading}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, py: 1.5 }}
                            disabled={isLoading}
                        >
                            {isLoading ? <CircularProgress size={24} /> : "Log in"}
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
};