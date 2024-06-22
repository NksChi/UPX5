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
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/equipments/descarte');
      if (!response.ok) {
        throw new Error('Erro ao buscar os dados');
      }
      const data = await response.json();
      setDescarte(data);
    } catch (error) {
      console.error('Erro ao buscar os dados:', error);
    }
  };

  const handleAtualizar = () => {
    fetchData();
  };

  const handleSolicitarDescarte = async () => {
    try {
      const response = await fetch('http://localhost:5000/equipments/solicitar-descarte', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.text();
      setMessage(result);
      setShowPopup(true); // Mostra o popup de confirmação
      fetchData(); // Atualiza a lista de equipamentos marcados para descarte
    } catch (error) {
      console.error('Erro ao solicitar descarte:', error);
      setMessage('Erro ao solicitar descarte');
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const DescarteItem = ({ item }) => {
    return (
      <tr className="descarte-container">
        <td>{item.numeroSerie}</td>
        <td>{item.marca}</td>
        <td>{formatarData(item.dataFabricacao)}</td>
        <td>{item.data_ciclo_vida}</td>
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
        {message && <div className="alert alert-info">{message}</div>}
        <div className="row">
          <div className="col">
            <table className="table table-striped DescarteTable">
              <thead>
                <tr>
                  <th>N° de série</th>
                  <th>Modelo</th>
                  <th>Data de Fabricação</th>
                  <th>Ciclo de vida</th>
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
