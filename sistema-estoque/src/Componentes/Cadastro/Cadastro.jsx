import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Elements/Navbar/Navbar';
import Server from '../../assets/Server_Icon.png';
import './Cadastro.css';

const Cadastro = () => {
  const [cookies, , removeCookie] = useCookies(['session']);
  const navigate = useNavigate();

  const handleLogout = () => {
    removeCookie('session', { path: '/' });
    navigate('/cadastro');
  };

  const [nomeProduto, setNomeProduto] = useState('');
  const [marca, setMarca] = useState('');
  const [valor, setValor] = useState('');
  const [numeroSerie, setNumeroSerie] = useState('');
  const [valorS, setValorS] = useState('');
  const [tipo, setTipo] = useState('');
  const [dataFabricacao, setDataFabricacao] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const produto = {
      nomeProduto,
      marca,
      valor,
      numeroSerie,
      tipo,
      dataFabricacao,
    };

    console.log(produto);
  };

  return (
    <div className="register">
      <Navbar handleLogout={handleLogout} />
      <div className="page-container">
        <h1>Cadastro de Equipamentos</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="nomeProduto">Nome do produto:</label>
          <input
            type="text"
            id="nomeProduto"
            value={nomeProduto}
            onChange={(event) => setNomeProduto(event.target.value)}
          />

          <label htmlFor="marca">Marca:</label>
          <input
            type="text"
            id="marca"
            value={marca}
            onChange={(event) => setMarca(event.target.value)}
          />

          <label htmlFor="valor">Valor:</label>
          <input
            type="number"
            id="valor"
            value={valor}
            onChange={(event) => setValor(event.target.value)}
          />

          <label htmlFor="numeroSerie">N° de série:</label>
          <input
            type="text"
            id="numeroSerie"
            value={numeroSerie}
            onChange={(event) => setNumeroSerie(event.target.value)}
          />

          <label htmlFor="valorS">Valor Sugerido:</label>
          <input
            type="number"
            id="valorS"
            value={valorS}
            onChange={(event) => setValorS(event.target.value)}
          />

          <label htmlFor="tipo">Tipo:</label>
          <select
            id="tipo"
            value={tipo}
            onChange={(event) => setTipo(event.target.value)}
          >
            <option value="Servidor">Servidor</option>
            <option value="Notebook">Notebook</option>
            <option value="Impressora">Impressora</option>
            <option value="Outro">Outro</option>
          </select>

          <label htmlFor="dataFabricacao">Data de fabricação:</label>
          <input
            type="date"
            id="dataFabricacao"
            value={dataFabricacao}
            onChange={(event) => setDataFabricacao(event.target.value)}
          />

          <button type="submit">Cadastrar</button>
        </form>
      </div>
      <div className="image-container">
        <img src={Server} alt="Server" className="top-image" />
      </div>
    </div>
  );
};

export default Cadastro;
