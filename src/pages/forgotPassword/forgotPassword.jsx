import React, { useState } from "react";
import {
    Button,
    Grid,
    Typography,
    Box,
    Link
} from "@mui/material";
import MyForm from "../../component/formInput";

const ForgotPassword = () => {
    const [formData, setFormData] = useState({
        email: ''
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value
        });
    }

    return (
        <Box height="auto"
            sx={{ ml: 'auto', mr: "auto", pr: "15px", pl: "15px", pt: "50px" }}>
            <Box
                maxWidth="525px" flexDirection={"column"} gap={2}
                display="flex" p={4} sx={{ backgroundColor: '#eaeded', m: "0 auto 50px", p: "30px 50px 25px" }}>
                <Box gap={1.5}>
                    <Typography sx={{ color: 'green', fontSize: 20, fontWeight: 700 }}>Password Recovery</Typography>
                    <Typography sx={{ mt: '4px', fontSize: 12 }}>Enter your email to recover your password.
                        You will receive an email with instructions. If you are having trouble recovering your password.
                        Please<Link sx={{ color: "green", ml: "4px" }}>contact with us.</Link> </Typography>

                </Box>
                <Grid item xs={12}>
                    <MyForm id="email" label="Email" type="email" value={formData.email} onChange={handleChange} />
                </Grid>

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
                        Send
                    </Button>
                </Box>
                <Box display='flex' gap={25} justifyContent="space-around" sx={{mt:"-10px"}} >
                    <Link
                        href="/login"
                        sx={{
                            color: 'green', fontSize: 14, fontFamily: "", mt: '8px', textDecorationColor: 'green'
                        }}>
                        Login
                    </Link>
                    <Box display='flex' gap={0.5} justifyContent="center" >
                        <Typography sx={{ mt: '5px', fontSize: 14 }}>Not a member yet? </Typography>
                        <Link
                            href="/register"
                            sx={{
                                color: 'green', fontSize: 14, fontFamily: "", mt: '8px', textDecorationColor: 'green'
                            }}>
                            Register
                        </Link>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default ForgotPassword;
