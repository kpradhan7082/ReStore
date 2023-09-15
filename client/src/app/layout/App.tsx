import './styles.css';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Header from './Header';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import agent from '../../api/agent';
import LoadingComponent from './LoadingComponent';
import { useStoreContext } from '../context/StoreContext';
import { getCookie } from '../util/util';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const { setBasket } = useStoreContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = getCookie("UserId")
    if (userId) {
      agent.Basket.get()
        .then(basket => setBasket(basket))
        .catch(error => console.log(error))
        .finally(() => setLoading(false))
    }
    else {
      setLoading(false)
    }
  }, [])

  if (loading)
    return <LoadingComponent message="Initializing app..." />

  const paletteType = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === 'light' ? '#eaeaea' : '#121212'
      }
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <ToastContainer hideProgressBar position='bottom-right' theme='colored' />
        <CssBaseline />
        <Header
          darkMode={darkMode}
          handleThemeChange={() => setDarkMode(!darkMode)} />
        <Container>
          <Outlet />
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
