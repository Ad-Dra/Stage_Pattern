const TipiMovimenti = require('../models/tipiMovimenti.model');

exports.getTipiBonifico = async (req, res) => {
    let data = await TipiMovimenti.getBonifico();
    if (data)
        res.status(200).send(data)
    else 
        res.status(500).send({message: data.message})
}