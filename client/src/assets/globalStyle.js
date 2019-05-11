import { createGlobalStyle } from 'styled-components';
import Arcade from './ArcadeClassic.TTF';
import Minecraft from './Minecraft.ttf';
/* eslint-disable no-confusing-arrow */

const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    font-family: ${props =>
      props.mode === 'start' ? 'ArcadeClassic' : 'Minecraft'};
    text-align: center;    
  }
  button {
    font-family: Minecraft, sans-serif;
    align-content: center;
    align-items: center;
    padding-top: 0.25em;
    background: transparent;
    color: ${props => (props.mode === 'scenario' ? 'black' : 'white')};
  }
  @font-face {
    font-family: ArcadeClassic;
    src: url(${Arcade});
  }
  @font-face {
    font-family: Minecraft;
    src: url(${Minecraft});
  }`;

export default GlobalStyle;
