import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import {
  Button,
  Divider,
  Grid,
  Typography,
  Box,
  FormControlLabel,
  Checkbox,
  Link,
} from "@mui/material";
import MyForm from "../../component/formInput";
import { loginUser } from "../../api_services/login";
const Login = () => {
  const [formdata, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value, checked } = e.target;
    setFormData({
      ...formdata,
      [id]: id === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { username, password, rememberMe } = formdata;
      const userID = sessionStorage.getItem("userID");

      const response = await loginUser(username, password, rememberMe, userID);

      if (response.userID) {
        alert("User is already logged in");
        console.log("Cookie received:", response.userID);
      } else {
        alert("Login successful");
      }

      navigate("/home/1");
    } catch (error) {
      alert("Login failed: " + error.message);
      console.error(error);
    }
  };

  return (
    <Box
      height="auto"
      sx={{ ml: "auto", mr: "auto", pr: "15px", pl: "15px", pt: "50px" }}
    >
      {/* Giao diện đăng nhập của bạn */}
      <Box
        maxWidth="525px"
        flexDirection={"column"}
        gap={2}
        display="flex"
        p={4}
        sx={{ backgroundColor: "#eaeded", m: "0 auto 50px", p: "30px 50px 25px" }}
      >
        <Box display="flex" gap={1.5}>
          <Typography sx={{ color: "green", fontSize: 20, fontWeight: 700 }}>
            Login
          </Typography>
          <Typography sx={{ mt: "4px" }}>with social account</Typography>
        </Box>
        {/* Nút Google và Facebook */}
        <Box
          width="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={2}
        >
          <Button
            variant="outlined"
            sx={{ flexGrow: 1, borderColor: "black", height: "40px", fontSize: 25 }}
          >
            <FcGoogle />
          </Button>
          <Button
            variant="contained"
            sx={{ flexGrow: 1, height: "40px", fontSize: 21 }}
          >
            <FaFacebookF />
          </Button>
        </Box>
        {/* Đường gạch ngang hoặc */}
        <Divider sx={{ my: 1, width: "100%", color: "black" }}>
          <Typography sx={{ color: "green", fontSize: 20 }}>or</Typography>
        </Divider>
        {/* Form đăng nhập */}
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <MyForm
              id="username"
              name="username"
              label="Username"
              value={formdata.username}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <MyForm
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formdata.password}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        {/* Checkbox remember me và Forgot password */}
        <Box display="flex" justifyContent="space-between">
          <FormControlLabel
            control={
              <Checkbox
                id="rememberMe"
                name="rememberMe"
                checked={formdata.rememberMe}
                onChange={handleChange}
                sx={{
                  color: "black",
                  "&.Mui-checked": { color: "green" },
                  "&:hover": { color: "green" },
                }}
              />
            }
            label="Remember me"
          />
          <Link
            href="/forgot-password"
            sx={{
              color: "green",
              fontSize: 16,
              fontFamily: "",
              mt: "8px",
              textDecorationColor: "black",
            }}
          >
            Forgot password?
          </Link>
        </Box>
        {/* Nút đăng nhập */}
        <Box display="flex" justifyContent="center" alignItems="center">
          <Button
            variant="contained"
            type="submit"
            onClick={handleSubmit}
            sx={{
              flexGrow: 1,
              height: "56px",
              fontSize: 20,
              backgroundColor: "green",
              "&:hover": {
                backgroundColor: "darkgreen",
              },
            }}
          >
            Login
          </Button>
        </Box>
        {/* Đăng ký nếu chưa có tài khoản */}
        <Box display="flex" gap={0.5} justifyContent="center">
          <Typography sx={{ mt: "5px" }}>Not a member yet? </Typography>
          <Link
            href="/register"
            sx={{
              color: "green",
              fontSize: 16,
              fontFamily: "",
              mt: "8px",
              textDecorationColor: "green",
            }}
          >
            Register
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
