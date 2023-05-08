import React from 'react';
import { Carousel } from './carousel';
import Box from '@mui/material/Box';
import { carouselData } from './carousel.cms';

export const BasicCarousel = () => {
  return (
    <Box sx={{margin: "0 157px"}}>
      <Carousel id="carousel-1" cards={carouselData.cards}>hello world!</Carousel>
    </Box>
  );
}

export const VerticalCarousel = () => {
  return (
    <Box sx={{margin: "0 147px"}}>
    <Carousel id="carousel-2" cards={carouselData.cards} orientation="v">hello world!</Carousel>
    </Box>
  );
}
