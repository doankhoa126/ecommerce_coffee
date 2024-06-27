import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { styled, alpha, useTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MenuIcon from '@mui/icons-material/Menu';
import { Menu, MenuItem } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from 'react-router-dom';


const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
    display: 'flex',
    alignItems: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '28ch',
            '&:focus': {
                width: '24ch',
            },
        },
    },
}));

const SearchButton = styled(Button)(({ theme }) => ({
    height: '100%',
    color: 'inherit',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: `#F4F4F4`,
    border: 'none',
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    padding: theme.spacing(1, 2),
    boxShadow: 'none',
    textTransform: 'none',
}));

const Header = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();

    const handleClickMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleLoginClick = () => {
        navigate('/login');
      };
    const handleLogoClick =()=>{
        navigate('/home/1');
    }

    const handleShoppingCart = () => {
        navigate('/shopping-card');
    }

    return (
        <Box>
            <Box
                sx={{
                    backgroundColor: 'white',
                    width: '100%',
                    height: isMobile ? 'auto' : '11vh',
                    display: 'flex',
                    alignItems: 'center',
                    paddingTop: '5px',
                    paddingLeft: {
                        xs: '10px',
                        sm: '20px',
                        md: '30px',
                        lg: '40px',
                        xl: '50px',
                    },
                    paddingRight: {
                        xs: '10px',
                        sm: '20px',
                        md: '30px',
                        lg: '40px',
                        xl: '50px',
                    },
                    paddingBottom: isMobile ? '10px' : 0,
                    flexDirection: isMobile ? 'column' : 'row',
                }}
            >
                <Button onClick={handleLogoClick}>

               
                <Box 
                    component="img"
                    src="https://asplynrorebnsajukbnu.supabase.co/storage/v1/object/public/image_coffee_web/logo.png?t=2024-06-19T08%3A15%3A42.427Z"
                    alt="Logo"
                    sx={{
                        width: {
                            xs: '100px',
                            sm: '150px',
                            md: '250px',
                            lg: '250px',
                            xl: '250px',
                        },
                        height: 'auto',
                        ml: {
                            xs: '10px',
                            sm: '20px',
                            md: '40px',
                            lg: '40px',
                            xl: '40px',
                        },
                        marginBottom: isMobile ? '10px' : 0,
                    }}
                />
               </Button>
                <Box sx={{ display: 'flex', alignItems: 'center', ml: 2, width: 'auto' }}>
                    <Search sx={{ backgroundColor: `#F4F4F4`, flexGrow: 1 }}>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search product..."
                            inputProps={{ 'aria-label': 'search' }}
                            sx={{ flexGrow: 1 }}
                        />
                    </Search>
                    <SearchButton variant="contained">Search</SearchButton>
                </Box>


                {!isMobile && <Box sx={{ flexGrow: 1 }} />}

                <Box sx={{ display: 'flex', alignItems: 'center', mr: isMobile ? 0 : '40px', flexDirection: isMobile ? 'column' : 'row' }}>
                    <HeadphonesIcon sx={{ fontSize: '40px', color: '#006F45' }} />
                    <Box sx={{ ml: '10px', textAlign: isMobile ? 'center' : 'left' }}>
                        <Typography variant="caption" display="block" gutterBottom sx={{ fontSize: '15px', fontWeight: 'bold' }}>
                            Hotline Support
                        </Typography>
                        <Typography variant="caption" display="block" gutterBottom sx={{ fontSize: '15px', color: '#006F45', fontWeight: 'bold' }}>
                            0962.011.202
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mt: isMobile ? '10px' : 0 }}>
                    <IconButton onClick={handleLoginClick}>
                        <AccountCircleIcon sx={{ fontSize: '40px', color: '#006F45' }} />
                    </IconButton>
                    <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                        <Badge badgeContent={0} color="error">
                            <FavoriteBorderIcon sx={{ fontSize: '40px', color: '#006F45' }} />
                        </Badge>
                    </IconButton>
                    <IconButton onClick={handleShoppingCart} size="large" aria-label="show 4 new mails" color="inherit">
                        <Badge badgeContent={4} color="error">
                            <ShoppingBagIcon sx={{ fontSize: '40px', color: '#006F45' }} />
                        </Badge>
                    </IconButton>
                </Box>
            </Box>
            <Box sx={{ backgroundColor: "#006F45", width: "100%", height: "auto" }}>
                <Box sx={{ backgroundColor: "#006F45", width: "100%", height: "6vh", display: 'flex', alignItems: 'center', flexDirection: isMobile ? 'column' : 'row' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={handleClickMenu}>
                        <IconButton sx={{ fontSize: '40px', color: '#E0EAF0', ml: isMobile ? 0 : "10vh" }}>
                            <MenuIcon />
                        </IconButton>
                        <Typography sx={{ fontSize: '20px', color: '#E0EAF0', ml: 1 }}>
                            Shop by Category
                        </Typography>
                    </Box>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleCloseMenu}
                        sx={{ml:"10vh"}}
                    >
                        <MenuItem onClick={handleCloseMenu}>Coffee Arabica</MenuItem>
                        <MenuItem onClick={handleCloseMenu}>Coffee Robusta</MenuItem>
                        <MenuItem onClick={handleCloseMenu}>Coffee Liberica</MenuItem>
                        <MenuItem onClick={handleCloseMenu}>Coffee Excelsa</MenuItem>
                    </Menu>
                    {!isMobile && (
                        <>
                            <Box>
                                <Typography sx={{ fontSize: '20px', color: '#E0EAF0', ml: "10vh" }}>
                                    Our Story
                                </Typography>
                            </Box>
                            <Box>
                                <Typography sx={{ fontSize: '20px', color: '#E0EAF0', ml: "10vh" }}>
                                    News
                                </Typography>
                            </Box>
                            {/* <Box>
                                <Typography sx={{ fontSize: '20px', color: '#E0EAF0', ml: "10vh" }}>
                                    Contact us
                                </Typography>
                            </Box> */}
                            <Box>
                                <Typography sx={{ fontSize: '20px', color: '#E0EAF0', ml: "10vh" }}>
                                Delivery & Return Policy
                                </Typography>
                            </Box>
                        </>
                    )}
                </Box>
                {isMobile && (
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography sx={{ fontSize: '20px', color: '#E0EAF0', mt: 1 }}>
                            Our Story
                        </Typography>
                        <Typography sx={{ fontSize: '20px', color: '#E0EAF0', mt: 1 }}>
                            News
                        </Typography>
                        {/* <Typography sx={{ fontSize: '20px', color: '#E0EAF0', mt: 1 }}>
                            Contact us
                        </Typography> */}
                        <Typography sx={{ fontSize: '20px', color: '#E0EAF0', mt: 1 }}>
                            Delivery & Return Policy
                        </Typography>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default Header;
