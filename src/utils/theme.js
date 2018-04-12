import theme from 'styled-theming';
import PropTypes from 'prop-types';

import { PADDING } from '../constants/theme';

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

export const getPadding = theme.variants('size', 'padding', {
  default: { normal: PADDING.normal.md, compact: PADDING.compact.md },
  xsmall: { normal: PADDING.normal.xs, compact: PADDING.compact.xs },
  small: { normal: PADDING.normal.sm, compact: PADDING.compact.sm },
  large: { normal: PADDING.normal.lg, compact: PADDING.compact.lg },
  xlarge: { normal: PADDING.normal.xl, compact: PADDING.compact.xl },
});

export const paddingProps = {
  padding: PropTypes.oneOf(['default', 'xsmall', 'small', 'large', 'xlarge']),
};
