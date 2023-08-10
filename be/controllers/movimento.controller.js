const Movimenti = require('../models/movimento.model');
const sql = require("../config/db.js");

exports.creaBonifico = async (req, res) => {
    if (req.body) {
        Movimenti.create(req.body, (err, data) => {
            if (err) {
                res.status(500).send({ message: err.message });
            } else {
                
            }
        });
    } else {
        res.status(400).send({ message: "Il contenuto non può essere vuoto!"})
    }
}