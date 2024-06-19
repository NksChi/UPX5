import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Elements/Navbar/Navbar'; 
import TechLife from '../../assets/TechLifeCycle_Logo.png';
import './Home.css'; 

const Home = () => {
  const [cookies, , removeCookie] = useCookies(['session']);
  const navigate = useNavigate();

  useEffect(() => {
    if (!cookies.session) {
      navigate('/login');
    }
  }, [cookies.session, navigate]);

  const handleLogout = () => {
    removeCookie('session', { path: '/' });
    navigate('/login');
  };

  return (
    <div>
      <Navbar handleLogout={handleLogout} />
      <div className="content">
        {cookies.session ? (
          <div>
            <h2>Bem-vindo(a) ao TechLifeCycle.</h2>
            <img src={TechLife} alt="Logo" className="techlife-logo" />
          </div>
        ) : (
          <div>
            <p>Você não está autenticado.</p>
            <p>Faça login para acessar esta página.</p>
            <button onClick={() => navigate('/login')}>Login</button>
          </div>
        )}
      </div>
      <div className="footer">
        &copy; {new Date().getFullYear()} TechLifeCycle. Todos os direitos reservados.
      </div>
    </div>
  );
}

export default Home;
