import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import './LoginPage.css';

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
      <div className="login-container">
        <div className="login-header">
          <img src="https://qima-lifesciences.com/newtone-technologies/" />
          <h1>
            <span className="tech">Tech</span>
            <span className="lifecycle">LifeCycle</span>
          </h1>
          <h2>Acesse sua conta</h2>
        </div>

        <form onSubmit={handleLogin}>
          <div className="login-input-group">
            <label htmlFor="username">Nome de usuário</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="login-input-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit">Entrar</button>
        </form>

        <button className="login-forgot-password-link" onClick={() => {}}>Esqueceu a senha?</button>
      </div>
    </div>
  );
}

export default Login;
