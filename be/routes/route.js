const express = require('express');
const router = express.Router();
const path = require('path');

// parse requests of content-type - application/json
router.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
router.use(express.urlencoded({ extended: true }));

const login = require("../controllers/utente.controller");
const utente = require("../controllers/user.controller");
const tipiMovimento = require('../controllers/tipiMovimenti.controller');
const movimento = require('../controllers/movimento.controller');
const contoCorrente = require('../controllers/contocorrente.controller');
const ricaricaTelefonica = require('../controllers/ricaricaTelefonica.controller');

const utility = require("../controllers/utility.controller");

router.get("*",utility.verifyToken);
router.post("*",utility.verifyToken);
router.put("*",utility.verifyToken);
router.delete("*",utility.verifyToken);


router.post("/api/login.json",login.login);

router.get("/api/getInfoAccount.json",utente.getInfoAccount);
router.get("/api/getInfoContoCorrente.json",utente.getDettagliContoCorrente);

router.post("/api/auth/createUtenza.json",       utente.create); 
router.post("/api/auth/ripristinaPassword.json", utente.ripristinaPassword); 
router.post("/api/auth/aggiornaUtenza.json",     utente.update); 

router.get("/api/getTipiBonifico.json", tipiMovimento.getTipiBonifico);
router.get("/api/getMovimenti.json", movimento.getMovimentiUtente);
router.post("/api/creaBonifico.json", movimento.creaBonifico);
router.post("/api/creaRicaricaTelefonica.json", movimento.creaRicaricaTelefonica);
router.post("/api/richiediPrestito.json", movimento.creaPrestito);

router.post("/api/admin/creaContoCorrente.json",     utility.checkRuolo, contoCorrente.creaContoCorrente); 
router.delete("/api/admin/deleteContoCorrente.json", utility.checkRuolo, contoCorrente.deleteContoCorrente); // 

router.get("/api/admin/getUtenti.json",          utility.checkRuolo, utente.getUtentiTotali);
router.delete("/api/admin/deleteAccount.json",   utility.checkRuolo, utente.deleteUtente); //
router.get("/api/admin/getContiCorrenti/:idUtente.json",   utility.checkRuolo, utente.getContiCorrentiForUtente); 

router.get("/api/getOperatori.json",ricaricaTelefonica.getOperatori);
router.get("/api/getImporti/:idOperatore.json",ricaricaTelefonica.getImportiForOperatore);

router.post("/api/logout.json", utente.logout);



module.exports = router;