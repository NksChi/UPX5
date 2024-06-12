import React from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['session']);
  const navigate = useNavigate();

  const handleLogout = () => {
    removeCookie('session', { path: '/' });
    navigate('/home');
  }

  return (
    <div>
      <h1>Home Page</h1>
      <p>Bem-vindo! Você está logado.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;
