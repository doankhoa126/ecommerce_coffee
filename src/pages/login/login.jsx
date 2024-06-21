import React, { useState } from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Container,
  Typography,
  Box,
  FormControlLabel,
  Checkbox,
  Link,
  IconButton,
} from "@mui/material";

const Login = () => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!emailOrUsername) {
      setEmailError("Username or email is required");
      return; // Exit early if validation fails
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is required");
      return; // Exit early if validation fails
    } else {
      setPasswordError("");
    }

    // Proceed with your login logic here using emailOrUsername and password
    console.log('data: ', emailOrUsername, password);

    // Example: Navigate to home page after successful login
    navigate('/home');
  };

  const handleGoogleSignIn = () => {
    // Handle Google sign-in logic here
    console.log("Google sign-in clicked");
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        // background: "linear-gradient(to right, #18A5A7, #BFFFC7)",
      }}
    >
      <Box
        sx={{
          padding: "30px",
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: "2px solid #00CC00",
          background: "white",
          borderRadius: "12px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography component="h1" variant="h4">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="emailOrUsername"
            label="Email or Username"
            name="emailOrUsername"
            autoComplete="emailOrUsername"
            autoFocus
            value={emailOrUsername}
            onChange={(e) => setEmailOrUsername(e.target.value)}
            error={!!emailError}
            helperText={emailError}
          />
          <TextField
            variant="outlined"
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
            error={!!passwordError}
            helperText={passwordError}
          />
          <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <FormControlLabel
              sx={{ display: "flex", fontSize: "16px" }}
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  name="rememberMe"
                  color="primary"
                />
              }
              label={
                <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                  Remember Me
                </Typography>
              }
            />
            <Typography sx={{ pl: "28%", fontSize: "16px" }}>
              <Link
                href="#"
                sx={{
                  color: "black",
                  textDecoration: "none",
                }}
              >
                Forgot password?
              </Link>
            </Typography>
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Box sx={{ justifyContent: "center", display: "flex", mt: 2 }}>
            <Typography sx={{ fontSize: "16px", textAlign: "center" }}>
              or login with
            </Typography>
          </Box>
          <Box sx={{ justifyContent: "center", display: "flex", mt: 1 }}>
            <IconButton>
              <FacebookIcon sx={{ fontSize: "32px", color: "#1877F2" }} />
            </IconButton>
            <IconButton onClick={handleGoogleSignIn}>
              <FcGoogle
                style={{
                  fontSize: "32px",
                  color: "#DB4437",
                  paddingLeft: "10px",
                }}
              />
            </IconButton>
            <IconButton>
              <GitHubIcon sx={{ fontSize: "32px", color: "#333333", marginLeft: "10px" }} />
            </IconButton>
          </Box>
          <Box sx={{ justifyContent: "center", display: "flex", mt: 1 }}>
            <Typography>
              <Link
                href="#"
                sx={{
                  pt: "10px",
                  textDecoration: "none",
                  fontSize: "16px",
                  color: "black",
                }}
              >
                Not registered? Create account
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
