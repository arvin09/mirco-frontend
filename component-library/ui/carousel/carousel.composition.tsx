import { Carousel } from './carousel';

import { carouselData } from './carousel.cms';

export const BasicCarousel = () => {
  return (
    <Carousel {...carouselData}>hello world!</Carousel>
  );
}
