import { React, useEffect } from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import { Button, CardContent, CardMedia, Typography } from '@mui/material';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export type CarouselProps = {
  cards?: card[];
};

interface card {
  label: string;
  title: string;
  description: string;
  url: string;
  alt: string;
}

export function Carousel(props: CarouselProps) {
  let carousel: any;
  let cardWidth: number;
  let arrowIcons: any;
  let scrollWidth: number;

  useEffect(() => {
    carousel = document.querySelector('#cardContainer');
    cardWidth = document.querySelectorAll('.card')[0].clientWidth + 16;
    arrowIcons = document.querySelectorAll('.navButtons');
    scrollWidth = carousel.scrollWidth - carousel.clientWidth;
  }, []);

  const handleClick = (e) => {
    carousel.scrollLeft += e.target.id == 'left' ? -cardWidth : cardWidth;
    setTimeout(() => {
      arrowIcons[0].style.opacity = carousel.scrollLeft == 0 ? 0.2 : 1;
      arrowIcons[0].style.pointerEvents = carousel.scrollLeft == 0 ? "none" : "";
      arrowIcons[1].style.opacity = carousel.scrollLeft == scrollWidth ? 0.2 : 1;
      arrowIcons[1].style.pointerEvents = carousel.scrollLeft == scrollWidth ? "none" : "";
    }, 60);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        position: 'relative',
        width: '100%',
        padding: "10px 0",
        justifyContent: "center"
      }}
    >
      <Button
        id="left"
        className="navButtons"
        sx={{
          minWidth: '24px',
          opacity: '0.2'
        }}
        onClick={(e) => handleClick(e)}
        size="small"
      >
        <ArrowBackIosNewIcon
          fontSize="medium"
          sx={{
            pointerEvents: 'none',
          }}
        />
      </Button>
      <Box
        id="cardContainer"
        sx={{
          display: 'flex',
          position: 'relative',
          maxWidth: '1176px',
          overflow: 'hidden',
          scrollBehavior: 'smooth',
          whiteSpace: 'nowrap',
          background: '#3d3b3b',
        }}
      >
        {props.cards &&
          props.cards.map((card, index) => (
            <Card
              key={index}
              className="card"
              sx={{
                minWidth: '278px',
                minHeight: '203px',
                margin: '10px 8px',
                cursor: 'pointer',
              }}
            >
              <CardMedia
                image={card.url}
                sx={{
                  height: '156px',
                  backgroundColor: 'gray',
                }}
              />

              <CardContent
                sx={{
                  ':last-child': {
                    padding: '0 0 0 5px',
                  },
                }}
              >
                <Typography variant="body2" component="div">
                  {card.title || 'Title'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {card.description || 'Description'}
                </Typography>
              </CardContent>
            </Card>
          ))}
      </Box>
      <Button
        id="right"
        className="navButtons"
        sx={{
          minWidth: '24px',
        }}
        onClick={(e) => handleClick(e)}
        size="small"
      >
        <ArrowForwardIosRoundedIcon
          fontSize="medium"
          sx={{
            pointerEvents: 'none',
          }}
        />
      </Button>
    </Box>
  );
}
