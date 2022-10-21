// import
const checkEmail = require('email-validator');

// export 
module.exports = (req, res, next) => {
    if(!checkEmail.validate(req.body.email)){
        return res.status(400).json({message: "veuillez saisir une adresse email valide."})
    } else{
        next();
    }
};