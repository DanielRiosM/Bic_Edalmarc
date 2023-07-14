const mongoose = require('mongoose');

const masonsSchema = new mongoose.Schema({
    id_mason:{type: mongoose.Schema.Types.ObjectId, ref: "masons"},
    nombre: String,
    email: String,
    password: String,
    tipo_empleo: String,
    telefono: Number, 
});

const Masons = mongoose.model("Masons",masonsSchema);
module.exports = Masons;