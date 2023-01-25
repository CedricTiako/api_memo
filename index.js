const express = require('express');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv')
const mongoose = require('mongoose');
const memosController = require('./memoController')
const path = require('path');
const cors = require('cors')

const app = express();
dotenv.config()

app.use(cors())

// Configure bodyparser to handle post requests
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

app.use(fileUpload());

// Connect to Mongoose and set connection variable
// Deprecated: mongoose.connect('mongodb://localhost/resthub');
mongoose.connect(process.env.MONGODB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true}, () => console.log("Connecter a la bd Memo"));


// Configuration du port du serveur 
const port = process.env.PORT || 8080 ;
// Envoyer un message pour l'URL par défaut 
app.get('/', (req, res) => res.send('Hello World with Express'));
app.get('/memo', memosController.getMemos);
app.post('/memo', memosController.addMemos);
app.put('/memo/:id', memosController.updateMemo);
app.get('/memo/:id', memosController.getMemo);
app.use('/images', express.static(path.join(__dirname,'uploads')));


// Lancer l'application pour écouter le port spécifié 
app.listen(port, function () { 
     console.log("Exécution de RestHub sur le port " + port); 
});
// app.listen(3000)