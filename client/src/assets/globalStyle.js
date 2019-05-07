import { createGlobalStyle } from 'styled-components';
import Minecraft from './Minecraft.ttf';

const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    font-family: Minecraft, sans-serif;
    text-align: center;
  }
  @font-face {
    font-family: Minecraft;
    src: url(${Minecraft});
  }`;

export default GlobalStyle;
