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
import Snackbar from "@mui/material/Snackbar";
import {delay} from "@/core/utils/delay";
import {useAppNavigate} from "@/core/hooks/use-app-navigate";
import {LocalUsersStorage} from "@/modules/auth/store/local-users-storage";
import {LocalUser} from "@/modules/auth/models/local-user";

export const Register = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const {toLogin} = useAppNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setError(null)
            if (password !== passwordConfirmation) {
                setError("The passwords do not match")
                return
            }

            setIsLoading(true);
            await delay(1000)

            const localUser = {username, email, password} satisfies LocalUser
            const saved = LocalUsersStorage.saveUser(localUser);

            if (!saved) {
                setError("This username is already taken");
            } else {
                setSuccess("You have signed up successfully")
                await delay(1000)
                toLogin()
            }
        } catch (err) {
            console.error('Sign up failed:', err);
        } finally {
            setIsLoading(false)
        }
    };

    const handleClose = () => {
        setSuccess(null);
    };

    return (
        <Container maxWidth="xs" sx={{height: "100%", py: {xs: 2, sm: 3}}}>
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={success !== null}
                onClose={handleClose}
                autoHideDuration={1000}
            >
                <Alert
                    severity={"success"}
                    variant="filled"
                    sx={{width: '100%'}}
                >
                    {success}
                </Alert>
            </Snackbar>
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
                        Sign Up
                    </Typography>

                    {error && (
                        <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                            {error}
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
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="passwordConfirmation"
                            label="Password confirmation"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                            disabled={isLoading}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, py: 1.5 }}
                            disabled={isLoading}
                        >
                            {isLoading ? <CircularProgress size={24} /> : "Sign Up"}
                        </Button>

                        <Typography variant="body2" color="text.secondary" sx={{ mt: 3, textAlign: 'center' }}>
                            Do you have an account?
                        </Typography>

                        <Button
                            fullWidth
                            variant="outlined"
                            sx={{ mt: 3, mb: 2, py: 1.5 }}
                            disabled={isLoading}
                            onClick={() => toLogin()}
                        >
                            Sign In
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
};