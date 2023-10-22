const express = require('express');
const serverapp = express();

const resultados = {
  pessoas: [
    { id: 1, nome: "Marcelo" },
    { id: 2, nome: "João" },
    { id: 3, nome: "Maria" }
  ],
  carros: [
    { id: 1, modelo: "Fusca" },
    { id: 2, modelo: "Gol" },
    { id: 3, modelo: "Palio" }
  ],
  animais: [
    { id: 1, nome: "Cachorro" },
    { id: 2, nome: "Gato" },
    { id: 3, nome: "Papagaio" }
  ]
};

serverapp.get('/dados/:tipo', (req, res) => {
  const tipo = req.params.tipo;
  if (resultados[tipo]) {
    res.json(resultados[tipo]);
  } else {
    res.status(404).send('Tipo de dados não encontrado');
  }
});

const port = 3000; // Escolha a porta que você deseja usar
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
