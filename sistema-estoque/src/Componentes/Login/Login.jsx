import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import './LoginPage.css';
import newtonPaivaLogo from '../../assets/newton_paiva_logo.png';
import recycleTech from '../../assets/recycle_tech.png';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [cookies, setCookie] = useCookies(['session']);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', { username, password });
      if (response.status === 200) {
        setCookie('session', 'loggedin', { path: '/' });
        navigate('/home');
      } else {
        alert('Credenciais inválidas');
      }
    } catch (error) {
      alert('Erro ao tentar fazer login');
    }
  };

  return (
    <div className="login-page">
      <img src={newtonPaivaLogo} alt="Top" className="top-image" />
      <div className="login-container">
        <div className="login-header">
          <img src={recycleTech} alt="Logo" />
          <h1>
            <span className="tech">Tech</span>
            <span className="lifecycle">LifeCycle</span>
          </h1>
        </div>
        <h2>Acesse sua</h2>
        <form onSubmit={handleLogin}>
          <div className="login-input-group">
            <label htmlFor="username">Login:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="login-input-group">
            <label htmlFor="password">Senha:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="forgot-password-container">
            <a href="#" className="login-forgot-password-link">Esqueceu a senha?</a>
          </div>
          <button type="submit">Entrar</button>
        </form>
      </div>
      <div className="footer">
        &copy; {new Date().getFullYear()} TechLifeCycle. Todos os direitos reservados.
      </div>
    </div>
  );
}

export default Login;
