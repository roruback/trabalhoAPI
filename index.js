const express = require('express');
const app = express();
const etag = require('etag'); // Importando a biblioteca etag

// Declaração Dados 
let pessoas = [
  {id: 1, nome:'Marcelo'},
  {id: 2, nome:'João'},
  {id: 3, nome:'Maria'},
]
let carros = [
  {id: 1, modelo:'Fusca'},
  {id: 2, modelo:'Gol'},
  {id: 3, modelo:'Palio'},
]
let animais = [
  {id: 1, nome:'Cachorro'},
  {id: 2, nome:'Gato'},
  {id: 3, nome:'Papagaio'},
]

// Criando Cache
const cache = {
  pessoas: etag(JSON.stringify(pessoas)),
  carros: etag(JSON.stringify(carros)),
  animais: etag(JSON.stringify(animais)),
};

// Rotas Dados com sistema de cache
app.get('/pessoas', (req, res) => {
  const currentEtag = cache.pessoas;
  if (req.header('If-None-Match') === currentEtag) {
    res.status(304).end();
  } else {
    res.setHeader('ETag', currentEtag);
    res.status(200).json({ pessoas });
  }
});

app.get('/carros', (req, res) => {
  const currentEtag = cache.carros;
  if (req.header('If-None-Match') === currentEtag) {
    res.status(304).end();
  } else {
    res.setHeader('ETag', currentEtag);
    res.status(200).json({ carros });
  }
});

app.get('/animais', (req, res) => {
  const currentEtag = cache.animais;
  if (req.header('If-None-Match') === currentEtag) {
    res.status(304).end();
  } else {
    res.setHeader('ETag', currentEtag);
    res.status(200).json({ animais });
  }
});
// Rotas Específicas - Ponto Extra
app.get("/pessoas/:id", (req, res) => {
  let id = req.params.id;
  if (id) {
    const jsonFilter = pessoas.filter((item) => item.id == id);
    res.send(jsonFilter);
    return;
  } else {
    const json = JSON.stringify([]);
    res.send(json);
    return;
  }
});

app.get("/carros/:id", (req, res) => {
  let id = req.params.id;
  if (id) {
    const jsonFilter = carros.filter((item) => item.id == id);
    res.send(jsonFilter);
    return;
  } else {
    const json = JSON.stringify([]);
    res.send(json);
    return;
  }
});

app.get("/animais/:id", (req, res) => {
  let id = req.params.id;
  if (id) {
    const jsonFilter = animais.filter((item) => item.id == id);
    res.send(jsonFilter);
    return;
  } else {
    const json = JSON.stringify([]);
    res.send(json);
    return;
  }
});
app.listen(3000, () => {
  console.log('Servidor está funcionando')
});