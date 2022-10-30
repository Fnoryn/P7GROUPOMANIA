const mongoose = require("mongoose");


mongoose.connect(`mongodb+srv://${process.env.USER_DB}:${process.env.PASSWORD_DB}@${process.env.LINK_DB}?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
