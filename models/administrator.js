const mongoose = requiere('mongoose');

const AdministratorSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    password: String,
    email: String,
});
const Administrator = mongoose.model('Administrator', AdministratorSchema);
module.exports = Administrator;