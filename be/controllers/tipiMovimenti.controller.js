const TipologieBonifico = require('../classiBase/tipologiaBonifico.js');

/**
 * Il seguente metodo individua le tipologie di bonifico
 * 
 * @param {*} req 
 * @param {*} res tipologie bonifico
 */
exports.getTipiBonifico = async (req, res) => {

    let tipologieBonifico= new TipologieBonifico();

    let tipologie=await tipologieBonifico.getTipologie();
    
    if (tipologie && tipologie.message)
        res.status(500).send({message: err.message});
    else 
        res.status(200).send(tipologie);
}