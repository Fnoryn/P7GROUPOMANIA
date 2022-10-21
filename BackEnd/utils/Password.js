// imort 
const passwordValidator = require('password-validator');

// instance
const passwordSchema = new passwordValidator();

// croteres
passwordSchema
  .is().min(8)
  .is().max(15)
  .has().uppercase()
  .has().lowercase()
  .has().digits()
  .has().not().spaces()
  .is().not().oneOf(['1Aaaaaaa', '2Bbbbbbb'])

// export 

module.exports = passwordSchema;
