import React, { useState } from "react";
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';
import {
  Button,
  FormLabel,
  FormControl,
  RadioGroup,
  Radio,
  Divider,
  Grid,
  Typography,
  Box,
  FormControlLabel,
  Link
} from "@mui/material";
import MyForm from "../../component/formInput";

const Register = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    gender: '',
    birthday: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      fullname: formData.fullname,
      username: formData.username,
      gender: formData.gender,
      birthday: formData.birthday,
      email: formData.email,
      password: formData.password,
    };

    axios.post('/api/users/register', data)
      .then((response) => {
        if (response.success) {
          alert("Register success!");
          console.log(response.data)
        }
      })
      .catch((error) => {
        alert("Error: " + error.message)
      })
  }

  return (
    <Box height="auto"
      sx={{ ml: 'auto', mr: "auto", pr: "15px", pl: "15px", pt: "50px" }}>
      <Box
        maxWidth="525px" flexDirection={"column"} gap={2}
        display="flex" p={4} sx={{ backgroundColor: '#eaeded', m: "0 auto 50px", p: "30px 50px 25px" }}>
        <Box display="flex" gap={1.5}>
          <Typography sx={{ color: 'green', fontSize: 20, fontWeight: 700 }}>Register</Typography>
          <Typography sx={{ mt: '4px' }}>with social account</Typography>
        </Box>
        <Box width='100%' display='flex' justifyContent='center' alignItems='center' gap={2}>
          <Button variant="outlined" sx={{ flexGrow: 1, borderColor: 'black', height: '40px', fontSize: 25 }}>
            <FcGoogle />
          </Button>
          <Button variant="contained" sx={{ flexGrow: 1, height: '40px', fontSize: 21 }}>
            <FaFacebookF />
          </Button>
        </Box>
        <Divider sx={{ my: 1, width: '100%', color: 'black' }}>
          <Typography sx={{ color: 'green', fontSize: 20 }}>or</Typography>
        </Divider>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <MyForm id="fullname" name="fullname" label="Full Name" value={formData.fullname} onChange={handleChange} />
          </Grid>
          <Grid item xs={12}>
            <MyForm id="username" name="username" label="Username" value={formData.username} onChange={handleChange} />
          </Grid>
          <Box width='100%' sx={{ ml: "50px", mt: "20px" }} >
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
              <RadioGroup

                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="gender"
                value={formData.gender} onChange={handleChange}
              >
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
              </RadioGroup>
            </FormControl>
          </Box>
          <Grid item xs={12} >
            <MyForm id="birthday" name="birthday" label="Month/Day/Year" type="date" value={formData.birthday} onChange={handleChange} />
          </Grid>
          <Grid item xs={12}>
            <MyForm id="email" name="email" label="Email" type="email" value={formData.email} onChange={handleChange} />
          </Grid>
          <Grid item xs={12}>
            <MyForm id="password" name="password" label="Password" type="password" value={formData.password} onChange={handleChange} />
          </Grid>
          <Grid item xs={12}>
            <MyForm id="confirmPassword" name="confirmPassword" label="Confirm Password" type="password" value={formData.confirmPassword} onChange={handleChange} />
          </Grid>
          <Grid item xs={12}>
            <MyForm id="phone" name="phone" label="Phone Number" type="text" value={formData.phone} onChange={handleChange} />
          </Grid>

        </Grid>

        <Box display="flex" justifyContent="center" alignItems="center">
          <Button variant="contained" type="submit" onClick={handleSubmit}
            sx={{
              mt: "25px",
              flexGrow: 1,
              height: '56px',
              fontSize: 20,
              backgroundColor: 'green',
              '&:hover': {
                backgroundColor: 'darkgreen'
              }
            }}>
            Register
          </Button>
        </Box>
        <Box display='flex' gap={0.5} justifyContent="center" >
          <Typography sx={{ mt: '5px' }}>Already have an account?</Typography>
          <Link
            href="/login"
            sx={{
              color: 'green', fontSize: 16, fontFamily: "", mt: '8px', textDecorationColor: 'green'
            }}>
            Login
          </Link>
        </Box>
      </Box>
    </Box>
  );
}

export default Register;