const mongoose = require('mongoose');

const { appConfig } = require('../config/config')

const informSchema = new mongoose.Schema({
    id_mason:{type: mongoose.Schema.Types.ObjectId, ref: "masons"},
    id_client:{type: mongoose.Schema.Types.ObjectId, ref: "client"},
    fechaInicio: Date,
    fechaFinal: Date,
    descripcion: Array,
    materiales: Array,
    monto: Number,
    imgUrl: String,
    firmaUrl: String
});

informSchema.methods.setImgUrl = function setImgUrl(filename){
    const {host, port } = appConfig
    this.imgUrl = `${host}:${port}/public/${filename}` 

}

informSchema.methods.setFirmaUrl = function setFirmaUrl(filename){
    const {host, port } = appConfig
    this.firmaUrl = `${host}:${port}/public/${filename}` 

}

const Inform = mongoose.model("Inform", informSchema);
module.exports = Inform;