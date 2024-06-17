import React from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Historico = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['session']);
  const navigate = useNavigate();

  const handleLogout = () => {
    removeCookie('session', { path: '/' });
    navigate('/cadastro');
  }

  return (
    <div>
      <h1>Cadastro</h1>
      <p>Aqui vamos precisar implementar a pagina de Cadastro dos equipamento</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Historico;