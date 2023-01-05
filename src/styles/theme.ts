

import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const colors = {
  white: '#EDEDEF',
  fullBlack: '#000000',
  lightPurple: 'hsl(273, 98%, 60%)',
  darkPurple: 'hsl(270, 50%, 40%)',
  green: '#4cd137',
  gray: '#a1a1a1',
  lightBlack: '#242424'
};

const breakpoints = createBreakpoints({
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em'
});

const styles = {
  global: {
    body: {
      color: 'white',
      background: "#000000",
      textDecoration: 'none'
    },
    a: {
      cursor: 'pointer',
      textDecoration: 'none'
    },
    '.rs-picker': {
      width: '100%'
    },
    '.rs-picker-daterange-content': {
      backgroundColor: '#242424 !important'
    },
    '.rs-picker-toolbar': {
      backgroundColor: '#242424 !important'
    }
  }
};

const theme = extendTheme({
  colors,
  styles,
  breakpoints
});

export default theme;