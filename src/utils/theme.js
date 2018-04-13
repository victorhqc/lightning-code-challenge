import theme from 'styled-theming';
import PropTypes from 'prop-types';

import { SPACING, HEADER_HEIGHT } from '../constants/theme';

export const getHeaderHeight = () => HEADER_HEIGHT;

export const getAllHeight = () => `calc(100vh - ${getHeaderHeight()}px)`;

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

export const getAccentColor = theme('mode', {
  dark: '#118ab2',
  light: '#06d6a0',
});

const getSpacingFactory = propName => theme.variants('size', propName, {
  default: { normal: SPACING.normal.md, compact: SPACING.compact.md },
  xsmall: { normal: SPACING.normal.xs, compact: SPACING.compact.xs },
  small: { normal: SPACING.normal.sm, compact: SPACING.compact.sm },
  large: { normal: SPACING.normal.lg, compact: SPACING.compact.lg },
  xlarge: { normal: SPACING.normal.xl, compact: SPACING.compact.xl },

  // Negative values
  '-default': { normal: -1 * SPACING.normal.md, compact: -1 * SPACING.compact.md },
  '-xsmall': { normal: -1 * SPACING.normal.xs, compact: -1 * SPACING.compact.xs },
  '-small': { normal: -1 * SPACING.normal.sm, compact: -1 * SPACING.compact.sm },
  '-large': { normal: -1 * SPACING.normal.lg, compact: -1 * SPACING.compact.lg },
  '-xlarge': { normal: -1 * SPACING.normal.xl, compact: -1 * SPACING.compact.xl },
});

const spacingPropsFactory = propName => ({
  [propName]: PropTypes.oneOf([
    'default',
    'xsmall',
    'small',
    'large',
    'xlarge',

    // Negative values
    '-default',
    '-xsmall',
    '-small',
    '-large',
    '-xlarge',
  ]),
});

export const getPadding = getSpacingFactory('padding');

export const getMargin = getSpacingFactory('margin');
export const getMarginY = getSpacingFactory('marginy');
export const getMarginX = getSpacingFactory('marginx');

export const paddingProps = spacingPropsFactory('padding');

export const marginProps = spacingPropsFactory('margin');
export const marginYProps = spacingPropsFactory('marginy');
export const marginXProps = spacingPropsFactory('marginx');
