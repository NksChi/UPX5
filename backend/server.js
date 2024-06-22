const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Conexão com o banco de dados MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'sistema-estoque'
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL');
});

//breakpoint onde validamos o login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT * FROM users WHERE email = ? AND senha = ?';
  db.query(query, [username, password], (err, results) => {
    if (err) {
      res.status(500).send('Erro no servidor');
      return;
    }
    if (results.length > 0) {
      res.status(200).send('Login bem-sucedido');
    } else {
      res.status(401).send('Credenciais inválidas');
    }
  });
});

// Novo endpoint para cadastro de equipamentos
app.post('/cadastro', (req, res) => {
  // Obtém a data atual
  const dataAtual = new Date();

  // Obtém o ano, mês e dia
  const ano = dataAtual.getFullYear();
  const mes = String(dataAtual.getMonth() + 1).padStart(2, '0'); // Mês começa em 0, então adicione 1
  const dia = String(dataAtual.getDate()).padStart(2, '0');

  // Formata a data no formato YYYY-MM-DD
  const dataFormatada = `${ano}-${mes}-${dia}`;
  const dataEntrada = dataFormatada; // Usa a data formatada como data de entrada

  // Adiciona 5 anos à data de entrada para o ciclo de vida
  const dataCicloVida = new Date();
  dataCicloVida.setFullYear(dataCicloVida.getFullYear() + 5);
  const anoCiclo = dataCicloVida.getFullYear();
  const mesCiclo = String(dataCicloVida.getMonth() + 1).padStart(2, '0'); // Mês começa em 0, então adicione 1
  const diaCiclo = String(dataCicloVida.getDate()).padStart(2, '0');
  const ciclo = `${anoCiclo}-${mesCiclo}-${diaCiclo}`; // Formata a data de ciclo de vida no formato YYYY-MM-DD

  const status_envio = 0;
  const { nomeProduto, marca, valor, numeroSerie, valorS, tipo, dataFabricacao } = req.body;

  const query = `INSERT INTO equipments (
    nomeProduto,
    marca,
    valor,
    numeroSerie,
    valorS,
    tipo,
    dataFabricacao,
    descarte,
    data_entrada,
    data_ciclo_vida, 
    status_envio
  ) VALUES (?, ?, ?, ?, ?, ?, ?, 0, ?, ?, ?)`;

  db.query(query, [nomeProduto, marca, valor, numeroSerie, valorS, tipo, dataFabricacao, dataEntrada, ciclo, status_envio], (err, results) => {
    if (err) {
      res.status(500).send(err + ' Erro no servidor');
      return;
    }
    res.status(200).send('Cadastro bem-sucedido');
  });
});


// Endpoint para marcar equipamento para descarte
app.post('/equipments/descarte', (req, res) => {
  const { numeroSerie } = req.body;
  const query = 'UPDATE equipments SET descarte = 1 WHERE numeroSerie = ?';
  db.query(query, [numeroSerie], (err, results) => {
    if (err) {
      res.status(500).send('Erro no servidor');
      return;
    }
    if (results.affectedRows > 0) {
      res.status(200).send('Item marcado para descarte com sucesso');
    } else {
      res.status(404).send('Item não encontrado');
    }
  });
});


// Novo endpoint para obter equipamentos que não estão marcados para descarte
app.get('/equipments', (req, res) => {
  const query = 'SELECT nomeProduto, marca, valor, numeroSerie, valorS, tipo, dataFabricacao, data_entrada FROM equipments WHERE descarte != 1';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send('Erro no servidor');
      return;
    }
    res.json(results);
  });
});

// Novo endpoint para obter equipamentos que estão marcados para descarte
app.get('/equipments/descarte', (req, res) => {
  const query = 'SELECT * FROM equipments WHERE descarte = 1 and status_envio  = 0';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send('Erro no servidor');
      return;
    }
    res.json(results);
  });
});

// Endpoint para solicitar descarte dos equipamentos marcados
app.post('/equipments/solicitar-descarte', (req, res) => {
  const query = 'UPDATE equipments SET status_envio = 1 WHERE descarte = 1';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao solicitar descarte dos equipamentos:', err);
      res.status(500).send('Erro no servidor');
      return;
    }
    res.status(200).send('Solicitação de descarte enviada com sucesso');
  });
});



//porta onde roda o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
