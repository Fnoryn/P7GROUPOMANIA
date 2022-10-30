// import
const mongoose = require('mongoose');

// modele
const saucesSchema = mongoose.Schema({    
    userId: { type: String, required: true},
    name: { type: String, required: true, maxLength: 20},
    manufacturer: {type: String, required: true, maxLength: 20},
    description: { type: String, required: true, maxLength: 50},
    mainPepper: { type: String, required: true, maxLength: 20},
    imageUrl: { type: String, required: true},
    heat: { type: Number, required: true, },
    likes: { type: Number, default: 0},
    dislikes: { type: Number, default: 0},
    usersLiked: { type: Array},
    usersDisliked: { type: Array},
});

// export
module.exports = mongoose.model('Sauce', saucesSchema);