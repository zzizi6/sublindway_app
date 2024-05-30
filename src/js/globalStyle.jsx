// GlobalStyles.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'IBM Plex Sans KR', sans-serif;
  }

  /* 기본 스타일 */
  .container {
    width: 100%;
    padding: 20px;
  }

  /* 작은 화면 (모바일) */
  @media (max-width: 600px) {
    .container {
      padding: 10px;
    }
  }

  /* 중간 화면 (태블릿) */
  @media (min-width: 601px) and (max-width: 1024px) {
    .container {
      padding: 15px;
    }
  }

  /* 큰 화면 (데스크탑) */
  @media (min-width: 1025px) {
    .container {
      padding: 20px;
    }
  }
`;

export default GlobalStyles;
