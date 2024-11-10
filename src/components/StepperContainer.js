import { AppBar, Box, Container, Toolbar, Typography, makeStyles } from '@material-ui/core';
import React from 'react';
import HorizontalStepper from './HorizontalStepper';

const useStyles = makeStyles((theme) => ({
  appBar: {
    background: 'linear-gradient(to right, #00aaff, #0066cc)',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    padding: theme.spacing(1, 2),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(0.5, 1),
    },
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2, 4),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1, 2),
    },
  },
  title: {
    fontFamily: '"Poppins", sans-serif',
    fontWeight: 'bold',
    fontSize: '2.5rem',
    color: '#fff',
    letterSpacing: '2px',
    animation: 'fadeIn 2s ease-out',
    textTransform: 'uppercase',
    textAlign: 'center',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
    [theme.breakpoints.down('md')]: {
      fontSize: '2rem',
      letterSpacing: '1px',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.6rem',
      padding: theme.spacing(0, 1),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.4rem',
      letterSpacing: '0.5px',
    },
  },
  container: {
    marginTop: theme.spacing(16),
    background: 'linear-gradient(135deg, rgba(255, 165, 0, 0.1), rgba(0, 0, 0, 0.05))',
    padding: theme.spacing(5),
    borderRadius: '15px',
    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      transform: 'scale(1.02)',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
    },
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(4),
      marginTop: theme.spacing(14),
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(3),
      marginTop: theme.spacing(12), // Adjusted for spacing below title
      borderRadius: '12px',
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2),
      marginTop: theme.spacing(10),
    },
  },
  box: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    animation: 'scaleUp 1s ease-out',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      gap: theme.spacing(2),
    },
  },
  '@keyframes fadeIn': {
    '0%': { opacity: 0 },
    '100%': { opacity: 1 },
  },
  '@keyframes scaleUp': {
    '0%': { transform: 'scale(0.9)' },
    '100%': { transform: 'scale(1)' },
  },
}));

const StepperContainer = () => {
  const classes = useStyles();

  return (
    <div>
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography className={classes.title} variant="h6">
            Atri Hostel Cricket Match - CSE Branch
          </Typography>
        </Toolbar>
      </AppBar>

      <Container className={classes.container}>
        <Box className={classes.box}>
          <HorizontalStepper />
        </Box>
      </Container>
    </div>
  );
};

export default StepperContainer;
