import React, { useState } from "react";
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

const Login = () => {
  const [formdata, setFormData] = useState({
    email: '',
    password: ''
  })

  const hanleChanged = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formdata,
      [id]: value
    })
  }

  return (
    <Box height="auto"
      sx={{ ml: 'auto', mr: "auto", pr: "15px", pl: "15px", pt: "50px" }}>
      <Box
        maxWidth="525px" flexDirection={"column"} gap={2}
        display="flex" p={4} sx={{ backgroundColor: '#eaeded', m: "0 auto 50px", p: "30px 50px 25px" }}>
        <Box display="flex" gap={1.5}>
          <Typography sx={{ color: 'green', fontSize: 20, fontWeight: 700 }}>Login</Typography>
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
            <MyForm id="email" label="Email" type="email" value={formdata.email} onChange={hanleChanged} />
          </Grid>
          <Grid item xs={12}>
            <MyForm id="password" label="Password" type="password" value={formdata.password} onChange={hanleChanged}/>
          </Grid>
        </Grid>
        <Box display="flex" justifyContent="space-between">
          <FormControlLabel control={<Checkbox
            sx={{
              color: 'black',
              '&.Mui-checked': { color: 'green' },
              '&:hover': { color: 'green' },

            }} />}
            label="Remember me" />
          <Link
            href="/forgot-password"
            sx={{
              color: 'green', fontSize: 16, fontFamily: "", mt: '8px', textDecorationColor: 'black'
            }}>
            Forgot password?
          </Link>
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Button variant="contained" type="submit"
            sx={{
              flexGrow: 1,
              height: '56px',
              fontSize: 20,
              backgroundColor: 'green',
              '&:hover': {
                backgroundColor: 'darkgreen'
              }
            }}>
            Login
          </Button>
        </Box>
        <Box display='flex' gap={0.5} justifyContent="center" >
          <Typography sx={{ mt: '5px' }}>Not a member yet? </Typography>
          <Link
            href="/register"
            sx={{
              color: 'green', fontSize: 16, fontFamily: "", mt: '8px', textDecorationColor: 'green'
            }}>
            Register
          </Link>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
