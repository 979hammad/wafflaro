import * as React from 'react';
import "./DisplayCards.css";
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';

export default function MobileDisplayCards(props) {
  const theme = useTheme();

  return (
    <Card sx={{ display: 'flex' }} className='marginBottomCards'>
       <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={props.url}
      />
      <Box className="mobileDataCard" sx={{ display: 'flex', flexDirection: 'column' }}>
          <p className='m_heading'>
            {props.name}
          </p>
          <p className='m_description'>
            {props.description}
          </p>
          <p className='m_price'><b>Price : {props.price} RS/- </b></p>
      </Box>
      
    </Card>
  );
}