const mongoose = requiere('mongoose');

const AdministratorSchema = new mongoose.Schema({
    nombre: String,
    email: String,
    telefono: Number,
    password: String,
});
const Administrator = mongoose.model('Administrator', AdministratorSchema);
module.exports = Administrator;