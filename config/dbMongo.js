const express = require('express')
const mongoose = require('mongoose')

const app = express()
const PORT = 3000

mongoose.set('strictQuery', false);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb+srv://Edalmarc:udrNYnjBDhQvub8x@bic-edalmarc.svgqcpw.mongodb.net/");
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

//Routes go here
// const UserRouter = require("./api/User");
const AdminRouter = require("../api/administrator");
const MasonsRouter = require("../api/masons");
const ClientRouter = require("../api/client");
const InformRouter = require("../api/inform");
// app.use("/user", UserRouter);
app.use("/administrator", AdminRouter);
app.use("/masons", MasonsRouter);
app.use("/client", ClientRouter);
app.use("/inform", InformRouter);

app.use("/public", express.static(`${__dirname}/storage/img`));

//Connect to the database before listening
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`listening on port ${PORT}`);
    })
});
