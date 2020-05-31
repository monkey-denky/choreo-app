import React from 'react';
import Board from './components/Board';
// import Controls from './components/Controls';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { primaryTheme } from './themes';
import Toolbar from './components/Toolbar';

const GlobalStyle = createGlobalStyle`
  body, #root {
    margin: 0;
    padding: 0;
    min-height: 100vh;
    min-width: 100vw;
    background: ${({ theme }) => theme.colors.background};
  }
  #root {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    color: ${({ theme }) => theme.colors.primary};
    align-items: center;
    justify-content: center;
    & > div {
        display: flex;
        position: relative;
    }
`;

const App: React.FC = () => {
    return (
        <ThemeProvider theme={primaryTheme}>
            <GlobalStyle></GlobalStyle>
            <Container>
                <div>
                    <Board />
                    <Toolbar />
                </div>
                {/* <Controls /> */}
            </Container>
        </ThemeProvider>
    );
};

export default App;
