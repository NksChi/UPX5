import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { IoClose, IoMenu, IoChevronDown, IoSearch } from 'react-icons/io5';
import RecycleTechLogo from '../../../assets/recycle_tech.png';
import UserIcon from '../../../assets/User.png';
import './Navbar.css';

const Navbar = ({ handleLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleUserMenuToggle = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="left-section">
          <NavLink to="/" className="navbar-logo">
            <img src={RecycleTechLogo} alt="Logo" />
          </NavLink>

          <ul className={`navbar-menu ${isMenuOpen ? 'is-open' : ''}`}>
            <li className="navbar-item">
              <NavLink to="/home" onClick={handleMenuToggle}>
                Home
              </NavLink>
            </li>
            <li className="navbar-item">
              <NavLink to="/cadastro-equipamentos" onClick={handleMenuToggle}>
                Cadastrar Equipamentos
              </NavLink>
            </li>
            <li className="navbar-item">
              <NavLink to="/consultar-historico" onClick={handleMenuToggle}>
                Consultar Histórico
              </NavLink>
            </li>
            <li className="navbar-item">
              <NavLink to="/descarte" onClick={handleMenuToggle}>
                Descarte
              </NavLink>
            </li>
          </ul>

          <div className="navbar-search">
            <div className="search-container">
              <IoSearch className="search-icon" />
              <input type="text" placeholder="Pesquisar..." />
            </div>
          </div>
        </div>

        <div className="right-section">
          <div className="user-menu" onClick={handleUserMenuToggle}>
            <img src={UserIcon} alt="Ícone de usuário" className="user-icon" />
            {isUserMenuOpen ? <IoChevronDown className="user-menu-icon" /> : null}
            {isUserMenuOpen && (
              <ul className="user-dropdown">
                <li>
                  <NavLink to="/perfil">Meu Perfil</NavLink>
                </li>
                <li>
                  <NavLink to="/configuracoes">Configurações</NavLink>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            )}
          </div>
        </div>

        <button className="navbar-toggle" onClick={handleMenuToggle}>
          {isMenuOpen ? <IoClose /> : <IoMenu />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
