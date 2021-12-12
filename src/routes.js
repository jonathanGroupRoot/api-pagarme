const express = require('express');
const routes = express.Router();

const CartaoController = require('./controller/CartaoController');
const UserController = require('./controller/UserController');



//USER
routes.post('/createUser', UserController.createUser);

//CRIANDO UM CARTÂO DE CRÉDITO E ADICIONANDO A UM USUÀRIO
routes.post('/createCards/:userId', CartaoController.createCard);
routes.get('/cards', CartaoController.indexCards);

//CRIANDO UMA TRANSAÇÂO
routes.post('/transactions', CartaoController.createTransActions);



module.exports = routes;