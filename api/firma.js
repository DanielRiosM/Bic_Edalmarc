const express = require("express");
const Firma = require("../models/firma");
const router = express();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/upload", upload.single("firma"), async (req, res) => {
  const firma = new Firma({
    name: req.file.originalname,
    firma: {
      data: req.file.buffer,
      contentType: req.file.mimetype,
    },
  });

  //save firma
  await firma.save();

  res.json({
    status: "SUCCESS",
    message: "Firma guardada",
  });
});

//leer firmas guardadas
router.get("/read", async (req, res) => {
  Firma.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.json({
      status: "SUCCESSS",
      message: "Firmas encontradas",
      data: result
    });
  });
});

//ver imagenes
router.get("/view", async (req, res) => {
  const firmas = await Firma.find().sort({ _id: -1 });

  res.render("firmas", { firmas: firmas });
});

module.exports = router;