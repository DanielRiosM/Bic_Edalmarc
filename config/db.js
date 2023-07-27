require('dotenv').config();
const mongoose = require('mongoose');


mongoose.set('strictQuery', false);

mongoose
    .connect("mongodb+srv://Edalmarc:udrNYnjBDhQvub8x@bic-edalmarc.svgqcpw.mongodb.net/Edalmarc?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('DB Connected');
    })
    .catch((err) => console.log(err));