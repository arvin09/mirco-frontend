import { React, useEffect } from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import { Button, CardContent, CardMedia, Typography } from '@mui/material';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

// TODO: use ref instead of javascript
type orientationType = 'h' | 'v';

export type CarouselProps = {
  id: string,
  cards: card[],
  orientation?: orientationType
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
  let leftNav, rightNav: any;
  let scrollWidth: number;
  let scrollCount: number = 1;
  let scrollItemCount: number = 0;

  useEffect(() => {
    carousel = document.querySelector(`#${props.id}-cardContainer`);
    leftNav = document.querySelector(`#${props.id}-left`);
    rightNav = document.querySelector(`#${props.id}-right`);
    scrollWidth = carousel.scrollWidth - (carousel.clientWidth);
  }, []);

  const styles = {
    mainContainer: {
      width: '100%',
      margin: 'auto',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      paddingLeft: {
        xs: '10px',
        sm: '10px',
        md: '32px',
      },
      paddingRight: {
        xs: '15px',
        sm: '10px',
        md: '30px',
      },
    },
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
    cardContainer: {
      display: 'flex',
      position: 'relative',
      overflow: { xs: 'scroll', md: 'hidden' },
      scrollBehavior: 'smooth',
      whiteSpace: 'nowrap',
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
      justifyContent: 'center',
    },
  };

  const handleScroll = () => {
    if (leftNav.offsetWidth != 0) {
      leftNav.style.opacity = carousel.scrollLeft == 0 ? 0.2 : 1;
      leftNav.style.pointerEvents = carousel.scrollLeft == 0 ? 'none' : '';
      rightNav.style.opacity = Math.ceil(carousel.scrollLeft+5) >= scrollWidth ? 0.2 : 1;
      rightNav.style.pointerEvents = Math.ceil(carousel.scrollLeft+5) >= scrollWidth ? 'none' : '';
    }
  };

  const handleClick = (e: any) => {
    cardWidth = document.querySelectorAll('.card')[0].clientWidth + 16;
    scrollCount = e?.target?.id == `${props.id}-left` ? --scrollCount : ++scrollCount;
    scrollItemCount = props.orientation === 'v' ? 7 : 4;

    if((e?.target?.id == `${props.id}-right` && scrollCount === Math.ceil(props.cards.length/scrollItemCount)) 
    || (e?.target?.id == `${props.id}-left` && scrollCount === Math.ceil(props.cards.length/scrollItemCount)) ) {
      scrollItemCount = props.cards.length%scrollItemCount
    }
    
    const scrollLength = cardWidth * scrollItemCount;
    carousel.scrollLeft += e?.target?.id == `${props.id}-left` ? -scrollLength : scrollLength;
  };

  return (
    <Box
      id={props.id}
      sx={styles.mainContainer}
    >
      <Box
        className="header"
        sx={styles.header}
      >
        <Typography variant="h6" component="span">
          Heading
        </Typography>
        <Typography variant="body2" component="span" sx={{pt: "8px"}}>
          View all
        </Typography>
      </Box>
      <Box sx={styles.wrapper}>
        <Button
          id={`${props.id}-left`}
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
        <Box
          id={`${props.id}-cardContainer`}
          sx={styles.cardContainer}
          onScroll={() => handleScroll()}
        >
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
                  <Typography variant="body1" component="div">
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
          id={`${props.id}-right`}
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
    </Box>
  );
}
