// imports
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// modele
const urserSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
});

// controle d'unicité
urserSchema.plugin(uniqueValidator);

// export
module.exports = mongoose.model('User', urserSchema);