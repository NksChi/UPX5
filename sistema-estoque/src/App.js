import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import Historico from './Componentes/Historico/Historico';
import Cadastro from './Componentes/Cadastro/Cadastro';
import Login from './Componentes/Login/Login';
import Home from './Componentes/Home/Home';
import Descarte from './Componentes/Descarte/Descarte';
import PrivateRoute from './PrivateRoute';

const App = () => {
  const [cookies] = useCookies(['session']);

  return (
    <Router>
      <Routes>
        <Route path="/" element={cookies.session ? <Navigate to="/home" /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<PrivateRoute component={<Home />} />} />
        <Route path="/historico" element={<PrivateRoute component={<Historico />} />} />
        <Route path="/cadastro" element={<PrivateRoute component={<Cadastro />} />} />
        <Route path="/descarte" element={<PrivateRoute component={<Descarte />} />} />
      </Routes>
    </Router>
  );
}

export default App;
