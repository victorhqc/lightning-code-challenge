import theme from 'styled-theming';

export const getBackgroundColor = theme('mode', {
  light: '#fff',
  dark: '#20262e',
});

export const getComplementBackgroundColor = theme('mode', {
  light: '#fefefe',
  dark: '#1c2128',
});

export const getColor = theme('mode', {
  light: '#333',
  dark: '#cfd0d2',
});

export const getComplementColor = theme('mode', {
  light: '#000',
  dark: '#fbfbfb',
});
