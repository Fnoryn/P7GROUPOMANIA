// import
const Sauce = require('../models/Sauce');
const fs = require('fs');
const log = require('../utils/winston');
// créer une sauce
exports.createSauce = (req, res, next) => {
    console.log(req.body.sauce);
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    delete sauceObject._userId;
    const sauce = new Sauce({
        ...sauceObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
  
    sauce.save()
    .then(() => { res.status(201).json({message: 'Sauce enregistré !'})})
    .catch(error => { res.status(400).json( { error })})
 };

// créer ou supprimer un like/dislike
exports.likeSauce = (req, res, next) =>{
    //liker
    if (req.body.like === 1) {
        Sauce.updateOne( 
          { _id: req.params.id },
          {
            $inc: { likes: req.body.like++ },
            $push: { usersLiked: req.body.userId },
          }
        )
          .then((sauce) => res.status(200).json({ message: "Ajout Like" }))
          .catch((error) => res.status(400).json({ error }));
      } else if (req.body.like === -1) { //disliker
        Sauce.updateOne(
          { _id: req.params.id },
          {
            $inc: { dislikes: req.body.like++ * -1 },
            $push: { usersDisliked: req.body.userId },
          }
        )
          .then((sauce) => res.status(200).json({ message: "Ajout Dislike" }))
          .catch((error) => res.status(400).json({ error }));
      } else {//update like pour supp
        Sauce.findOne({ _id: req.params.id })
          .then((sauce) => {
            if (sauce.usersLiked.includes(req.body.userId)) {
              Sauce.updateOne(
                { _id: req.params.id },
                { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 } }
              )
                .then((sauce) => {
                  res.status(200).json({ message: "Suppression Like" });
                })
                .catch((error) => res.status(400).json({ error }));
            } else if (sauce.usersDisliked.includes(req.body.userId)) { // update dislike pour supp 
              Sauce.updateOne(
                { _id: req.params.id },
                {
                  $pull: { usersDisliked: req.body.userId },
                  $inc: { dislikes: -1 },
                }
              )
                .then((sauce) => {
                  res.status(200).json({ message: "Suppression Dislike" });
                })
                .catch((error) => res.status(400).json({ error }));
            }
          })
          .catch((error) => res.status(400).json({ error }));
      }
};

// voir une sauce
exports.getOneSauce = (req, res, next)=>{
    log.info('getOneSauce');
    Sauce.findOne({ _id: req.params.id})
        .then(sauce =>{
            log.info("sauce trouvé");
            log.info(sauce);
            res.status(200).json(sauce)
        } )
        .catch(error =>{
            log.error(`${error}`);
            res.status(404).json({ error})
        } );
};

// voir toute les sauce
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error}));
  };

// modifier une sauce
exports.modifySauce = (req, res, next)=>{
    const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    delete sauceObject._userId;
    Sauce.findOne({_id: req.params.id})
        .then((sauce) => {
            if (sauce.userId != req.auth.userId) {
                res.status(401).json({ message : 'Not authorized'});
            } else {
                Sauce.updateOne({ _id: req.params.id}, { ...sauceObject, _id: req.params.id})
                .then(() => res.status(200).json({message : 'Sauce modifié!'}))
                .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};


// supprimer une sauce
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id})
        .then(sauce => {
            if (sauce.userId != req.auth.userId) {
                res.status(401).json({message: 'Not authorized'});
            } else {
                const filename = sauce.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Sauce.deleteOne({_id: req.params.id})
                        .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch( error => {
            res.status(500).json({ error });
        });
 };