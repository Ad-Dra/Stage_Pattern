const express = require('express');
const router = express.Router();
const path = require('path');

// parse requests of content-type - application/json
router.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
router.use(express.urlencoded({ extended: true }));

const login = require("../controllers/login.controller");
const utility = require("../controllers/utility.controller");

router.get("*",utility.verifyToken);
router.post("*",utility.verifyToken);
router.put("*",utility.verifyToken);
router.delete("*",utility.verifyToken);

//router.post("/api/createUtenza.json", utente.create);
//router.post("/api/ripristinaPassword.json", utente.ripristinaPassword); 
router.post("/api/login.json",login.login); 

module.exports = router;