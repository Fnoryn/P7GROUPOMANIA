// import
const multer = require('multer');
const fs = require('fs');
const imageDir = "./images";

// type de fichier acceptés
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp'
};

if (fs.existsSync(imageDir)){
  console.log("Dossier image déjà créé");
} else{
  fs.mkdir('./imges', (err) =>{
    if (err){
      return console.error(err);
    }
    console.log("Dossier images créé !");
  });
}

// configuration
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

// export
module.exports = multer({storage: storage}).single('image');