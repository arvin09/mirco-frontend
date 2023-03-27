import React from 'react';
import { Carousel } from './carousel';

import { carouselData } from './carousel.cms';

export const BasicCarousel = () => {
  return (
    <Carousel {...carouselData}>hello world!</Carousel>
  );
}

export const VerticalCarousel = () => {
  return (
    <Carousel cards={carouselData.cards} orientation="v">hello world!</Carousel>
  );
}
