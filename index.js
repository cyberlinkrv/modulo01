const express = require("express");
const server = express();

//Query params = teste?nome=Divino
//server.get('/teste', (req, res) =>{
//Aqui eu faço uma requisição usando uma query teste?nome=Divino
//  const nome = req.query.nome; 
//aqui eu recebo o que vem da query na variavel nome que é o nome Divino
//  return res.json({message: `Hello ${nome}`});
//});

//Route params = /users/1
//para evidenciar que estamos usando route params usamos dois pontos : e a const
//server.get('/users/:id', (req, res) =>{
//  const id = req.params.id;
//aqui também posso usar a desestruturação desta forma const {id} = req.params
//  return res.json({message: `Buscando usuário ${id}`});
//})

//Request body = {"name": "Divino", "email": "divino_j_silva@hotmail.com"}
server.get('', (req, res) =>{

  
})



server.listen(3333);