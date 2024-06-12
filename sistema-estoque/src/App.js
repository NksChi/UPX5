import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Historico from './Componentes/Historico/Historico'
import Login  from './Componentes/Login/Login'
import Home  from './Componentes/Home/Home'
import PrivateRoute from './PrivateRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<PrivateRoute component={<Home />} />} />
        <Route path="/historico" element={<PrivateRoute component={<Historico />} />} />
      </Routes>
    </Router>
  );
}

export default App;
