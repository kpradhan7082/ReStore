import './styles.css';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Header from './Header';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const paletteType = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode:paletteType,
      background: {
        default : paletteType === 'light' ? '#eaeaea' : '#121212'
      }
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <ToastContainer hideProgressBar position='bottom-right' theme='colored'  />
        <CssBaseline />
        <Header
          darkMode={darkMode}
          handleThemeChange={()=>setDarkMode(!darkMode)} />
        <Container>
          <Outlet />
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
