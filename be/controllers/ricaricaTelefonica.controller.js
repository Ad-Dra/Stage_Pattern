
const RicaricaTelefonica = require("../models/ricaricaTelefonica.model.js");
const Utility = require("../controllers/utility.controller.js");

/**
 * 
 * 
 * @param {*} res valore che viene ritornato 
 */
exports.getOperatori=async (req,res)=>{

    RicaricaTelefonica.getOperatoriTelefonici((err, data) => {
        if (err)
            res.status(500).send({message:err.message});
        else 
            res.send(data);
    });
}

exports.getImportiForOperatore=async (req,res)=>{
    
    RicaricaTelefonica.getImporti(req.params.idOperatore,(err, data) => {
        if (err)
            res.status(500).send({message:err.message});
        else 
            res.send(data);
    });
}