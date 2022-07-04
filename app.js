//Utilizando o express
const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const { get } = require('http');
const { type } = require('os');

// ==== IMPORTANDO AS ROTAS ====
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRouter');

// ==== MIDDLEWARES ====
const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Middleware usado para ler o corpo do req.body da requisição.

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

//Criando o nosso middelware
//Ele entra de forma automatica dentro do ciclo de req res
//Na verdade eu chamo ele no .use()
app.use((req, res, next) => {
  console.log('Hello from the Middleware 🤓 ...');
  //Deve ser especificado para que o app não fique preso aqui.
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// --- MONTANDO AS ROTAS IMPORTADAS ---
app.use('/api/v1/users', userRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/reviews', reviewRouter);

module.exports = app;
// ==== START SERVER ====

// //Vamos criar a resposta para o get na raiz do projeto
// app.get('/', (req, res) => {
//     // res.status(200).send('Bem vindo ao meu primeiro projeto NodeJs');

//     //Enviando um JSON pro cliente: (o express automaticamente ajusta para cotent-type: json)
//     res.status(200).json({
//         usuario: 'Rodrigo Lima',
//         mensagem: 'Meu primeiro JSON enviado em express',
//     });
// });

// app.post('/', (req, res) => {
//     res.status(200).send('Resposta para metodo post');
// });

//Vamos escutar o nosso servidor e definir a função callback que será utilizada:
