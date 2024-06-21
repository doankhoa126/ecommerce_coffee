import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea } from '@mui/material';

export default function HomePage() {
  return (
    <Box>
        <Box  component="img"
                    src="https://asplynrorebnsajukbnu.supabase.co/storage/v1/object/public/image_coffee_web/slideshow.webp?t=2024-06-20T03%3A41%3A26.881Z"
                    alt="Slideshow" 
                     sx = {{
                        width: "80%",
                        height: "auto",
                        ml:"20vh",
                        display: 'flex', justifyContent: 'center', alignItems: 'center'
                    
                     }}>
        </Box>
        <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    <Typography sx={{ fontSize: "30px", fontWeight: 'bold', mt: "20px" }}>
        Promo Code
    </Typography>
</Box>

    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </Box>
  );
}
