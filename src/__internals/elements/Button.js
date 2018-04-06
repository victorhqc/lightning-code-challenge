import styled from 'styled-components';

const Button = styled.button`
  border: none;
  border-radius: 3px;
  color: white;
  background-color: #06d6a0;
  font-size: 2em;
  padding: 15px;
  cursor: pointer;

  &:hover {
    background-color: #05b083;
  }

  &:active {
    background-color: #047558;
  }
`;

export default Button;
