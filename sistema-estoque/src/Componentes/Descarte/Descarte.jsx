import React from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Descarte = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['session']);
  const navigate = useNavigate();

  const handleLogout = () => {
    removeCookie('session', { path: '/' });
    navigate('/descarte');
  }

  return (
    <div>
      <h1>Historico</h1>
      <p>Aqui vamos precisar implementar a pagina descarte dos equipamento</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Descarte;
