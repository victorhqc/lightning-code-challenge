import styled from 'styled-components';

const setFontSize = ({ size }) => {
  switch (size) {
    case 'small':
      return '0.5em';
    case 'normal':
      return '1em';
    case 'big':
      return '2em';
    default:
      return '1em';
  }
};

const setBackgroundColor = type => ({ color }) => {
  switch (color) {
    case 'red':
      return {
        normal: '#ef476f',
        hover: '#ae3451',
        active: '#6d2133',
      }[type];
    case 'green':
    default:
      return {
        normal: '#06d6a0',
        hover: '#05b083',
        active: '#047558',
      }[type];
  }
};

const Button = styled.button`
  border: none;
  border-radius: 3px;
  color: white;
  background-color: ${setBackgroundColor('normal')};
  font-size: ${setFontSize};
  padding: 15px;
  cursor: pointer;
  margin: 10px 0;

  &:hover {
      background-color: ${setBackgroundColor('hover')};
  }

  &:active {
      background-color: ${setBackgroundColor('active')};
  }
`;

export default Button;
