const mongoose = require('mongoose');

const firmaSchema = new mongoose.Schema({
    name: String,
    firma:{
        data: Buffer,
        contentType: String,
    },
});

const Firma = mongoose.model('Firma', firmaSchema);
module.exports = Firma;
