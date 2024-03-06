import './assets/styles/reset.css';
import 'react-toastify/dist/ReactToastify.css';
import './assets/styles/global.css';
import { Outlet, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import PlayerProvider from './context/playerContext';

function App() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="app">
      <ToastContainer autoClose={1800} theme="dark" />
      <Header />
      <PlayerProvider>
        <main>
          <Outlet />
        </main>
      </PlayerProvider>
      <Footer />

    </div>
  );
}

export default App;
