const mongoose = require('mongoose');

const informSchema = new mongoose.Schema({
    id_mason:{type: mongoose.Schema.Types.ObjectId, ref: "masons"},
    id_client:{type: mongoose.Schema.Types.ObjectId, ref: "client"},
    fechaInicio: Date,
    fechaFinal: Date,
    descripcion: Array,
    materiales: Array,
    monto: Number,
    imagen: Image,
    firma: Image,
});

const Inform = mongoose.model("Inform", informSchema);
module.exports = Inform;