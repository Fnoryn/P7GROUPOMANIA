// import 
const rateLimit = require ('express-rate-limit');

//config 
const max = rateLimit({
    windowMs : 2 * 60 * 1000, //temps en ms
    max : 3, //nb d'essais authorisées
    message : "Votre comte es bloqué durant 5min suite à 3 essais infructueuses."
});

//export
module.exports = {max};