//Import env
require("dotenv").config();
//mongodb
require("./config/db");

const app = require("express")();

//cors
const cors = require("cors");
app.use(cors());
//For accepting post from data
const bodyParser = require("express").json;
app.use(
  bodyParser({
    limits: { fileSize: 3 * 1024 * 1024 },
  })
);
//
// const UserRouter = require("./api/User");
const AdminRouter = require("./api/administrator");
const MasonsRouter = require("./api/masons");
// app.use("/user", UserRouter);
app.use("/administrator", AdminRouter);
app.use("/masons", MasonsRouter);

app.listen(process.env.PORT, () => {
  console.log(`server running on port ${process.env.PORT}`);
});
