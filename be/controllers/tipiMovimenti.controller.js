const TipiMovimenti = require('../models/tipiMovimenti.model');

exports.getTipiBonifico = async (req, res) => {
    TipiMovimenti.getBonifico((err, data) => {
        if (data)
        res.status(200).send(data)
    else 
        res.status(500).send({message: err.message})
    });
}