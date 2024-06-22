import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Elements/Navbar/Navbar';
import './Historico.css';

const Historico = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['session']);
  const navigate = useNavigate();

  const handleLogout = () => {
    removeCookie('session', { path: '/' });
    navigate('/login');
  };

  const [historico, setHistorico] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/equipments');
      if (!response.ok) {
        throw new Error('Erro ao buscar os dados');
      }
      const data = await response.json();
      setHistorico(data);
    } catch (error) {
      console.error('Erro ao buscar os dados:', error);
    }
  };

  const handleAtualizarHistorico = () => {
    fetchData();
  };

  const handleSelectItem = (numeroSerie) => {
    setSelectedItem(numeroSerie);
  };

  const handleMarcarParaDescarte = async () => {
    if (selectedItem) {
      try {
        const response = await fetch('http://localhost:5000/equipments/descarte', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ numeroSerie: selectedItem }),
        });
        const result = await response.text();
        setMessage(result);
        fetchData();
      } catch (error) {
        setMessage('Erro ao marcar item para descarte');
        console.error('Erro ao marcar item para descarte:', error);
      }
    }
  };

  return (
    <div>
      <Navbar handleLogout={handleLogout} />
      <div className="container">
        <h1 className="mt-4">Equipamentos Listados</h1>
        {message && <div className="alert alert-info">{message}</div>}
        <div className="row">
          <div className="col">
            <table className="table table-striped HistoricoTable">
              <thead>
                <tr>
                  <th>N° de série</th>
                  <th>Modelo</th>
                  <th>Data de entrada</th>
                  <th>Valor</th>
                  <th>Valor Sugerido</th>
                  <th>Tipo</th>
                  <th>Data de Fabricação</th>
                </tr>
              </thead>
              <tbody>
                {historico.map((compra) => (
                  <Compra
                    key={compra.numeroSerie}
                    compra={compra}
                    onSelectItem={handleSelectItem}
                    isSelected={compra.numeroSerie === selectedItem}
                  />
                ))}
              </tbody>
            </table>
            <div className="footer-regis">
              <button className="btn" onClick={handleAtualizarHistorico}>Atualizar Histórico</button>
              <button className="btn btn-danger" onClick={handleMarcarParaDescarte} disabled={!selectedItem}>
                Marcar para Descarte
              </button>
              <footer className="footer-text">
                &copy; {new Date().getFullYear()} TechLifeCycle. Todos os direitos reservados.
                <span className='upx'>
                  / UPX5 - GRUPO 8
                </span>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Compra = ({ compra, onSelectItem, isSelected }) => {
  return (
    <tr
      className={`compra-container ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelectItem(compra.numeroSerie)}
    >
      <td>{compra.numeroSerie}</td>
      <td>{compra.nomeProduto}</td>
      <td>{formatarData(compra.data_entrada)}</td>
      <td>{formatarValor(compra.valor)}</td>
      <td>{formatarValor(compra.valorS)}</td>
      <td>{compra.tipo}</td>
      <td>{formatarData(compra.dataFabricacao)}</td>
    </tr>
  );
};

const formatarData = (data) => {
  if (!data) return '';
  const dataObj = new Date(data);
  const dia = dataObj.getDate().toString().padStart(2, '0');
  const mes = (dataObj.getMonth() + 1).toString().padStart(2, '0');
  const ano = dataObj.getFullYear();
  return `${dia}-${mes}-${ano}`;
};

const formatarValor = (valor) => {
  if (typeof valor !== 'number') return '';
  return `R$ ${valor.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
};

export default Historico;
