const express = require("express");
const router = express.Router();
const masons = require("../models/masons");

//password
const bcrypt = require("bcrypt");
//sign up
router.post("/signup", (req, res) => {
  let nombre = req.body.nombre;
  let email = req.body.email;
  let password = req.body.password;
  let tipo_empleo = req.body.tipo_empleo;
  let telefono = req.body.telefono;

  if (
    nombre == "" ||
    email == "" ||
    password == "" ||
    tipo_empleo == "" ||
    telefono == ""
  ) {
    res.json({
      status: "FAILED",
      message: "Empty input fileds",
    });
  } else if (
    !/[^0-9\.\,\"\?\!\;\:\#\$\%\&\(\)\*\+\-\/\<\>\=\@\[\]\\\^\_\{\}\|\~]*$/.test(
      nombre
    )
  ) {
    res.json({
      status: "FAILED",
      message: "Invalid nombre entry",
    });
  } else if (
    !/^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/.test(
      email
    )
  ) {
    res.json({
      status: "FAILED",
      message: "Invalid email entered",
    });
  } else {
    //Checking if masons alredy exist
    masons
      .find({ email })
      .then((result) => {
        if (result.length) {
          //if user alredy exist
          res.json({
            status: "FAILED",
            message: "User alredy exists",
          });
        } else {
          //Password handling
          const saltRounds = 10;
          bcrypt
            .hash(password, saltRounds)
            .then((hashedPassword) => {
              const newMasons = new masons({
                nombre,
                email,
                password: hashedPassword,
                tipo_empleo,
                telefono,
              });
              newMasons
                .save()
                .then((result) => {
                  res.json({
                    status: "SUCCESS",
                    message: "Sign up successful",
                    data: result,
                  });
                })
                .catch((err) => {
                  res.json({
                    status: "FAILED",
                    message: "An error ocurred while saving user account!",
                  });
                });
            })
            .catch((err) => {
              res.json({
                status: "FAILED",
                message: "An error ocurred while hashing password!",
              });
            });
        }
      })
      .catch((err) => {
        res.json({
          status: "FAILED",
          message: "An error ocurrred while checking for existing user!",
        });
      });
  }
});

//sign in
router.post("/signin", (req, res) => {
  let { email, password } = req.body;
  email = email.trim();
  password = password.trim();

  if (email == "" || password == "") {
    res.json({
      status: "FAILED",
      message: "Empty credentials supplied!",
    });
  } else {
    //Check if the user exists
    masons
      .find({ email })
      .then((data) => {
        if (data.length) {
          //Masons exists
          const hashedPassword = data[0].password;
          bcrypt
            .compare(password, hashedPassword)
            .then((result) => {
              if (result) {
                //Password match
                res.json({
                  status: "SUCCESS",
                  message: "Signin successful!",
                  data: data,
                });
              } else {
                res.json({
                  status: "FAILED",
                  message: "Invalid password entered",
                });
              }
            })
            .catch((err) => {
              res.json({
                status: "FAILED",
                message: "An error ocurred while comparing passwords!",
              });
            });
        } else {
          res.json({
            status: "FAILED",
            message: "Invalid credentials entered!",
          });
        }
      })
      .catch((err) => {
        res.json({
          status: "FAILED",
          message: "An error ocurred while checking for existing masons",
        });
      });
  }
});

module.exports = router;
