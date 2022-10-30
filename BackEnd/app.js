// imports
  require('dotenv').config;
  const express = require('express');
  const helmet = require('helmet')
  const bodyParser = require('body-parser');
  const mongoose = require('mongoose');
  const path = require('path');
  const saucesRoutes = require('./routes/sauce');
  const userRoutes = require('./routes/user');
  const app = express();
  const log = require('./utils/winston');
  const mongoSanitize = require('express-mongo-sanitize');


// connexion a la base de données 
mongoose.connect(`mongodb+srv://${process.env.USER_DB}:${process.env.PASSWORD_DB}@${process.env.LINK_DB}?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => log.info('Connexion à MongoDB réussie !'))
  .catch(() => log.error('Connexion à MongoDB échouée !'));

// fonction du server 

  // sécurisation des en-tête http
  app.use(helmet({ crossOriginResourcePolicy: { policy: "same-site" } }));


  //paramètrage des en-têtes
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  //pour parser les objets json
app.use(express.json());
app.use(bodyParser.json());


  // évité l'injection de code dans mongo
app.use(mongoSanitize());

  // pour la gestion des fichiers images
app.use('/images', express.static(path.join(__dirname, 'images')));

 //routes
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);

// export
module.exports = app;
