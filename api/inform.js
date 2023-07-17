const express = require("express");
const router = express.Router();
const inform = require("../models/inform");

router.post("/createInform", (req, res) => {
    let fechaInicio = req.body.fechaInicio;
    let fechaFinal = req.body.fechaFinal;
    let descripcion = req.body.descripcion;
    let materiales = req.body.materiales;
    let monto = req.body.monto;
    let imagen = req.body.imagen;
    let firma = req.body.firma;
    if (
        fechaInicio == "" ||
        fechaFinal == "" ||
        descripcion == "" ||
        materiales == "" ||
        monto == "" ||
        imagen == "" ||
        firma == "" 
      ) {
        res.json({
          status: "FAILED",
          message: "Empty input fileds",
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
      } else{
        const newInform = new inform({
            fechaInicio,
            fechaFinal,
            descripcion,
            materiales,
            monto,
            imagen,
            firma,
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

module.exports = router;