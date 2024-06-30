import { Box } from "@mui/material";
import Typography from '@mui/material/Typography';
import MailIcon from '@mui/icons-material/Mail';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import StorefrontIcon from '@mui/icons-material/Storefront';
import useMediaQuery from '@mui/material/useMediaQuery';
import useTheme from '@mui/material/styles/useTheme';

const Footer = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box sx={{
            borderTop: '8px solid #E0EAF0',
            borderBottom: '8px solid #E0EAF0',
            width: "100%",
            height: "20vh",
            backgroundColor: 'white',
            color: '#E0EAF0',
            padding: {
                xs: '20px', // Padding on extra-small devices
                sm: '30px', // Padding on small devices
                md: '40px', // Padding on medium devices
                lg: '50px', // Padding on large devices
                xl: '60px', // Padding on extra-large devices
            },
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            textAlign: isMobile ? 'center' : 'left',
        }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: isMobile ? '20px' : 0 }}>
                <StorefrontIcon sx={{ fontSize: '40px', color: '#006F45' }} />
                <Box sx={{ ml: isMobile ? 0 : '10px', mt: isMobile ? '10px' : 0 }}>
                    <Typography variant="caption" display="block" gutterBottom sx={{ fontSize: '16px', fontWeight: 'bold', color: '#006F45' }}>
                        Address
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom sx={{ fontSize: '16px', color: '#006F45', fontWeight: 'bold' }}>
                        Vo Van Ngan Street, Thu Duc City
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: isMobile ? '20px' : 0 }}>
                <MailIcon sx={{ fontSize: '40px', color: '#006F45', ml: isMobile ? 0 : '10vh' }} />
                <Box sx={{ ml: isMobile ? 0 : '10px', mt: isMobile ? '10px' : 0 }}>
                    <Typography variant="caption" display="block" gutterBottom sx={{ fontSize: '16px', fontWeight: 'bold', color: '#006F45' }}>
                        Email Us
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom sx={{ fontSize: '16px', color: '#006F45', fontWeight: 'bold' }}>
                        cskh@coffeemarket.com.vn
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: isMobile ? '20px' : 0 }}>
                <Typography variant="caption" display="block" gutterBottom sx={{ fontSize: '16px', fontWeight: 'bold', color: '#006F45' }}>
                    Follow Us
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', ml: '5px' }}>
                    <FacebookIcon sx={{ color: '#006F45', fontSize: '26px' }} />
                    <YouTubeIcon sx={{ ml: '5px', color: '#006F45', fontSize: '26px' }} />
                    <InstagramIcon sx={{ ml: '5px', color: '#006F45', fontSize: '26px' }} />
                </Box>
            </Box>




            <Box sx={{ display: 'flex', alignItems: 'center', mb: isMobile ? '20px' : 0 }}>
                <Box
                    component="img"
                    src="https://vfxqlimpalwlebgektea.supabase.co/storage/v1/object/public/img_coffee_web/footer_payment.png?t=2024-06-30T10%3A56%3A52.896Z"
                    alt="Payment Methods"
                    sx={{ width: isMobile ? '200px' : '300px', height: 'auto', ml: isMobile ? 0 : '30vh' }}
                />
            </Box>
        </Box>
    );
}

export default Footer;
