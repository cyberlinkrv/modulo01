const express = require("express");
const server = express();
server.use(express.json()); // aqui é para informar ao express que ele vai ler json

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
//const users = ['Divino', 'Marcos', 'Maria'];
//desta maneira quando eu faço uma requisição na API passando a posição do vetor
//ele me retorna o nome do usuario que esta naquela posição
//http://localhost:3000/users/1 retorna Marcos;
//http://localhost:3000/users/0 retorna Divino
//server.get('/users/:index', (req, res) =>{
//  const { index } = req.params;
//  return res.json(users[index]);
//})


//CRUD - Create, Read, Update, Delete

users = ['Divino', 'Marcos', 'Maria'];

//midware Global, onde eu consigo trazer estatus do sistema
server.use((req, res, next)=>{
  console.time('Request');
  console.log(`Método: ${req.method}; URL: ${req.url}`);
  next();
  console.timeEnd('Request');
});

//midware Local
function checkUserExists(req, res, next){
  if(!req.body.name){
    return res.status(400).json({error: 'User name is required'});
  }
  return next();
}

function checkUserInArray(req, res, next){
  const user = users[req.params.index];
  if(!user){
    return res.status(400).json({error: 'User does not exists'});
  }
  req.user = user;
  return next();
}




//aqui com o metodo GET eu pego todo os dados do usuário
server.get('/users', (req, res) =>{
  return res.json(users);
})
//aqui com o metodo GET digitando a posição da informação
server.get('/users/:index', checkUserInArray, (req, res) =>{
  //const { index } = req.params;
  return res.json(req.user);
})

//aqui com o metodo POST eu posso criar um usuario - Create
server.post('/users', checkUserExists, (req, res)=>{
  const { name } = req.body; //aqui é o corpo da requisição
  users.push(name); //aqui como o users é um array posso usar o metodo push e colocar o que veio do body
  return res.json(users);

})

//aqui com o metodo PUT eu editar um usuario - Update
server.put('/users/:index', checkUserExists, checkUserInArray,(req, res) =>{
  const { index } = req.params;
  const { name } = req.body;
  
  users [index] = name;

  return res.json(users);
});

//aqui com o metodo DELETE
server.delete('/users/:index', checkUserInArray, (req, res) =>{
  const { index } = req.params;

  users.splice(index, 1);//aqui eu passo a posição do nome no vetor e 1 para indicar que so quero apagar aquela posição apartir

  return res.send();
});


server.listen(3000);


//DEPENDÊNCIAS
//esta dependencia faz com que o server da api seja atualizado sozinho quando 
//eu fizer qualquer alteração; a flegue -D no final é para executar em modo
//Desenvolverdo
// => yarn add nodemon -D 
//depois de instalada pode ser executada com o comando yarn nodemon index.js
//porém editamos o arquivo pakage.json e colocamos o seguinte
//"scripts":{"dev": "nodemon index.js"}
//com isso podemos dar somente o comando yarn dev