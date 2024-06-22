import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Elements/Navbar/Navbar';
import './Descarte.css';

const Descarte = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['session']);
  const navigate = useNavigate();

  const handleLogout = () => {
    removeCookie('session', { path: '/' });
    navigate('/login');
  };

  const [descarte, setDescarte] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fakeData = [
      { numeroSerie: 'ASD1234J', modelo: 'Switch Cisco Catalyst 9300', dataFabricacao: '2024-03-22', cicloVida: '5 anos', empresaColeta: 'E-MILE Reciclagem de Lixo Eletrônico', status: 'Pendente' },
      { numeroSerie: 'BVN5678L', modelo: 'Switch Juniper EX4300', dataFabricacao: '2024-08-15', cicloVida: '6 anos', empresaColeta: 'COLETABH', status: 'Concluído' },
      { numeroSerie: 'TYU3456K', modelo: 'Servidor Dell PowerEdge R740', dataFabricacao: '2024-11-01', cicloVida: '7 anos', empresaColeta: 'Lithium Informática', status: 'Pendente' },
      { numeroSerie: 'UIO6789M', modelo: 'Servidor HPE ProLiant DL360', dataFabricacao: '2024-06-30', cicloVida: '8 anos', empresaColeta: 'Reciclando BH', status: 'Concluído' },
      { numeroSerie: 'PLK9012N', modelo: 'Access Point Aruba 340 Series', dataFabricacao: '2024-09-18', cicloVida: '6 anos', empresaColeta: 'RECICLA CLUB Gestão de Resíduos', status: 'Pendente' },
      { numeroSerie: 'QWE4567O', modelo: 'Router Cisco ASR 1001-X', dataFabricacao: '2024-05-27', cicloVida: '9 anos', empresaColeta: 'Electra Reciclo', status: 'Concluído' }
    ];
    setDescarte(fakeData);
  }, []);

  const handleAtualizar = () => {
    console.log('Atualizando dados de descarte...');
  };

  const handleSolicitarDescarte = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const DescarteItem = ({ item }) => {
    return (
      <tr className="descarte-container">
        <td>{item.status}</td>
        <td>{item.numeroSerie}</td>
        <td>{item.modelo}</td>
        <td>{formatarData(item.dataFabricacao)}</td>
        <td>{item.cicloVida}</td>
        <td>{item.empresaColeta}</td>
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

  return (
    <div>
      <Navbar handleLogout={handleLogout} />
      <div className="container">
        <h1 className="mt-4">Descarte</h1>
        <div className="row">
          <div className="col">
            <table className="table table-striped DescarteTable">
              <thead>
                <tr>
                  <th>Status</th>
                  <th>N° de série</th>
                  <th>Modelo</th>
                  <th>Data de Fabricação</th>
                  <th>Ciclo de vida</th>
                  <th>Empresa para coleta</th>
                </tr>
              </thead>
              <tbody>
                {descarte.map((item) => (
                  <DescarteItem key={item.numeroSerie} item={item} />
                ))}
              </tbody>
            </table>
            <div className="text-center my-3">
              <button className="btn atualizar" onClick={handleAtualizar}>Atualizar</button>
            </div>
            <div className="footer">
              <button className="btn success" onClick={handleSolicitarDescarte}>Solicitar Descarte</button>
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

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={closePopup}>&times;</span>
            <h2>Solicitação de Descarte</h2>
            <p>Em breve, um representante entrará em contato para agendar o descarte dos equipamentos.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Descarte;
