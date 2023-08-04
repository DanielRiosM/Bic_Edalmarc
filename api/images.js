const express = require("express");
const Image = require("../models/images");
const router = express();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/upload", upload.single("image"), async (req, res) => {
  const image = new Image({
    name: req.file.originalname,
    image: {
      data: req.file.buffer,
      contentType: req.file.mimetype,
    },
  });

  //save image
  await image.save();

  res.json({
    status: "SUCCESS",
    message: "Imagen guardada",
  });
});

//leer imagenes guardadas
router.get("/read", async (req, res) => {
  Image.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.json({
      status: "SUCCESSS",
      message: "Imagenes encontradas",
      data: result
    });
  });
});

//ver imagenes
router.get("/view", async (req, res) => {
  const images = await Image.find().sort({ _id: -1 });

  res.render("images", { images: images });
});

module.exports = router;
