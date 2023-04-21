import { React, useEffect } from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import { Button, CardContent, CardMedia, Typography } from '@mui/material';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

type orientationType = 'h' | 'v';

export type CarouselProps = {
  cards: card[];
  orientation: orientationType;
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
    // cardWidth = document.querySelectorAll('.card')[0].clientWidth + 16;
    arrowIcons = document.querySelectorAll('.navButtons');
    scrollWidth = carousel.scrollWidth - carousel.clientWidth;
  }, []);

  const styles = {
    navButton: {
      minWidth: '24px',
      opacity: '0.2',
      display: { xs: 'none', md: 'inline-flex' },
      height: {
        xs: '94px',
        lg: '156px',
        ...(props.orientation === 'v' && {
          xs: '162px',
          lg: '232px',
        }),
      },
      marginTop: '10px',
    },
    container: {
      display: 'flex',
      position: 'relative',
      maxWidth: {
        xs: '100%',
        sm: '732px',
        md: '1176px',
      },
      overflow: { xs: 'scroll', md: 'hidden' },
      scrollBehavior: 'smooth',
      whiteSpace: 'nowrap',
      // background: '#3d3b3b',
    },
    card: {
      minWidth: {
        xs: '45%',
        sm: '167px',
        lg: '278px',
        ...(props.orientation === 'v' && {
          xs: '33.33%',
          sm: '109px',
          lg: '155px',
        }),
      },
      borderRadius: 0,
      boxShadow: 'none',
      margin: '10px 8px',
      cursor: 'pointer',
    },
    image: {
      height: {
        xs: '94px',
        lg: '156px',
        ...(props.orientation === 'v' && {
          xs: '162px',
          lg: '232px',
        }),
      },
      backgroundColor: 'gray',
    },
    wrapper: {
      display: 'flex',
      position: 'relative',
      width: '100%',
      // padding: "10px",
      justifyContent: 'center',
    },
  };

  const handleScroll= () => {
    arrowIcons[0].style.opacity = carousel.scrollLeft == 0 ? 0.2 : 1;
    arrowIcons[0].style.pointerEvents = carousel.scrollLeft == 0 ? 'none' : '';
    arrowIcons[1].style.opacity = carousel.scrollLeft >= scrollWidth ? 0.2 : 1;
    arrowIcons[1].style.pointerEvents = carousel.scrollLeft >= scrollWidth ? 'none' : '';
  }

  const handleClick = (e:Event) => {
    cardWidth = document.querySelectorAll('.card')[0].clientWidth + 16;
    carousel.scrollLeft += e?.target?.id == 'left' ? -cardWidth*4 : cardWidth*4;
  };

  return (
    <Box sx={styles.wrapper}>
      <Button
        id="left"
        className="navButtons"
        sx={styles.navButton}
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
      <Box id="cardContainer" sx={styles.container} onScroll={() => handleScroll()}>
        {props.cards &&
          props.cards.map((card, index) => (
            <Card key={index} className="card" sx={styles.card}>
              <CardMedia image={card.url} sx={styles.image} />
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
        sx={{ ...styles.navButton, opacity: 1 }}
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
