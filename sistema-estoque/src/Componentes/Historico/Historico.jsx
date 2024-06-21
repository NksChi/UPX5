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
    navigate('/historico');
  }

  const [historico, setHistorico] = useState([]);

  useEffect(() => {
    const fakeData = [
      { numeroSerie: 'KG587T0', situacao: 'Entregue', modelo: 'Switch Cisco nexus 3132Qx', dataSaida: '2024-01-15', dataRetorno: '2024-01-20', valor: 299, marcarParaDescarte: false },
      { numeroSerie: 'FT879H', situacao: 'Em trânsito', modelo: 'Switch Hp 5500-48G', dataSaida: '2024-02-17', dataRetorno: null, valor: 199, marcarParaDescarte: true },
      { numeroSerie: 'MXQ74500C3', situacao: 'Entregue', modelo: 'Servidor Dell R630', dataSaida: '2024-05-18', dataRetorno: '2024-05-25', valor: 699, marcarParaDescarte: false },
      { numeroSerie: 'BC1234A', situacao: 'Em trânsito', modelo: 'Servidor Hp DL 380 g9', dataSaida: '2024-01-07', dataRetorno: null, valor: 1100, marcarParaDescarte: false },
      { numeroSerie: 'MK7890Z', situacao: 'Entregue', modelo: 'Access Point Cisco Aironet 2800', dataSaida: '2024-04-24', dataRetorno: '2024-04-30', valor: 900, marcarParaDescarte: true },
      { numeroSerie: 'ZY1234W', situacao: 'Entregue', modelo: 'Router Cisco ISR 1900', dataSaida: '2024-04-24', dataRetorno: '2024-04-30', valor: 900, marcarParaDescarte: true }
    ];
    setHistorico(fakeData);
  }, []);

  const handleAtualizarHistorico = () => {
    const updatedData = historico.map(compra => ({
      ...compra,
      situacao: compra.situacao === 'Em trânsito' ? 'Entregue' : compra.situacao
    }));
    setHistorico(updatedData);
  };

  return (
    <div>
      <Navbar handleLogout={handleLogout} />
      <div className="container">
        <h1 className="mt-4">Histórico de Compras</h1>
        <div className="row">
          <div className="col">
            <table className="table table-striped HistoricoTable">
              <thead>
                <tr>
                  <th>Situação</th>
                  <th>N° de série</th>
                  <th>Modelo</th>
                  <th>Data de saída</th>
                  <th>Data de Retorno</th>
                  <th>Valor</th>
                  <th>Marcar para descarte</th>
                </tr>
              </thead>
              <tbody>
                {historico.map((compra) => (
                  <Compra key={compra.numeroSerie} compra={compra} />
                ))}
              </tbody>
            </table>
            <div className="footer">
              <button className="btn btn-primary btn-atualizar" onClick={handleAtualizarHistorico}>Atualizar Histórico</button>
              <footer className="footer-text">&copy; {new Date().getFullYear()} TechLifeCycle. Todos os direitos reservados.</footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Compra = ({ compra }) => {
  return (
    <tr className="compra-container">
      <td>{compra.situacao}</td>
      <td>{compra.numeroSerie}</td>
      <td>{compra.modelo}</td>
      <td>{formatarData(compra.dataSaida)}</td>
      <td>{compra.dataRetorno ? formatarData(compra.dataRetorno) : 'Ainda em trânsito'}</td>
      <td>{formatarValor(compra.valor)}</td>
      <td>{compra.marcarParaDescarte ? 'sim' : 'não'}</td>
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
