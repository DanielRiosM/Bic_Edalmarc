const express = require("express");
const router = express.Router();
const inform = require("../models/inform");
const upload = require("../libs/storage");
const { addProduct } = require("../controllers/productController");
const { S3 } = require("@aws-sdk/client-s3");
const s3 = new S3();
const bodyParser = require("body-parser");

router.post("/createInform", (req, res) => {
  let fechaInicio = req.body.fechaInicio;
  let fechaFinal = req.body.fechaFinal;
  let descripcion = req.body.descripcion;
  let materiales = req.body.materiales;
  let monto = req.body.monto;
  if (
    fechaInicio == "" ||
    fechaFinal == "" ||
    descripcion == "" ||
    materiales == "" ||
    monto == ""
  ) {
    res.json({
      status: "FAILED",
      message: "Empty input fields",
    });
  } else if (
    !/[^0-9\.\,\"\?\!\;\:\#\$\%\&\(\)\*\+\-\/\<\>\=\@\[\]\\\^\_\{\}\|\~]*$/.test(
      descripcion
    )
  ) {
    res.json({
      status: "FAILED",
      message: "Invalid descripcion entry",
    });
  } else if (
    !/[^0-9\.\,\"\?\!\;\:\#\$\%\&\(\)\*\+\-\/\<\>\=\@\[\]\\\^\_\{\}\|\~]*$/.test(
      fechaInicio
    )
  ) {
    res.json({
      status: "FAILED",
      message: "Invalid fechaInicio entry",
    });
  } else if (
    !/[^0-9\.\,\"\?\!\;\:\#\$\%\&\(\)\*\+\-\/\<\>\=\@\[\]\\\^\_\{\}\|\~]*$/.test(
      fechaFinal
    )
  ) {
    res.json({
      status: "FAILED",
      message: "Invalid fechaFinal entry",
    });
  } else {
    const newInform = new inform({
      fechaInicio,
      fechaFinal,
      descripcion,
      materiales,
      monto,
    });
    newInform
      .save()
      .then((result) => {
        res.json({
          status: "SUCCESS",
          message: "Informe creado",
          data: result,
        });
      })
      .catch((err) => {
        res.json({
          status: "FAILED",
          message: "Error al rellenar el informe",
        });
      });
  }
});

//get inform
router.get("/read", async (req, res) => {
  inform.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.json({
      status: "SUCCESS",
      message: "Inform succesful obtained",
      data: result,
    });
  });
});

//Subir imagen
router.post("/subirImagen", upload.single("imgUrl"), addProduct);
router.post("/subirFirma", upload.single("firmaUrl"), addProduct);

//Subir imagenes con AWS
router.use(bodyParser.json());

router.get("/verImagen", async (req, res) => {
  let filename = req.path.slice(1);

  try {
    let s3File = await s3.getObject({
      Bucket: process.env.CYCLIC_BUCKET_NAME,
      Key: filename,
    });

    res.set("Content-type", s3File.ContentType);
    res.send(s3File.Body.toString()).end();
  } catch (error) {
    if (error.code === "NoSuchKey") {
      console.log(`No such key ${filename}`);
      res.sendStatus(404).end();
    } else {
      console.log(error);
      res.sendStatus(500).end();
    }
  }
});

module.exports = router;
