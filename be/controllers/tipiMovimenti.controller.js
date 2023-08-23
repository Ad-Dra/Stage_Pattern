const TipiMovimenti = require('../models/tipiMovimenti.model');
const logger = require("../logger.js");
const Utility = require("../controllers/utility.controller.js");

exports.getTipiBonifico = async (req, res) => {
    let username = await Utility.getUsername(req);

    TipiMovimenti.getBonifico((err, data) => {
        if (data){
            logger.info(username+": la dashboard si è evoluta in bonifico");

            res.status(200).send(data);
        }
        else 
            res.status(500).send({message: err.message})
    });
}