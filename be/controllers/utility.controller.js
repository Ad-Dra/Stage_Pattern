
var jwt = require('jsonwebtoken');
const sql = require("../config/db.js");

exports.verifyToken=async (req,res,next)=>{
    if(req.originalUrl!='/api/login.json'){
        token=JSON.parse(JSON.stringify(req.headers)).authorization;

        if(token!="null" && token!=undefined){
            jwt.verify(token,'secret', function(err, _tokendata) {
            if (err) {
                console.log("error: ", err);
                res.status(403).send({
                message:
                    "Effettuare l'autenticazione"
                });
                next(err);
            }
            next();
            })
        }
        else{
            res.status(403).send({
            message:
                "Effettuare l'autenticazione"
            });
            next();
        }
    }
    else
        next();
}

exports.isActiveUser=(dati,email)=>{
    let query="";
  
    return new Promise(resolve =>{
      if(email)
        query=`select utenzaAttiva from utente where (email= BINARY "${email}")`;
      else
        query=`select utenzaAttiva from utente where (email= BINARY "${dati.identificativo}" or username= BINARY "${dati.identificativo}")`;
      
      sql.query(query, (err, res) => {
        if(err) {
          console.log("error: ", err);
          resolve(err);
          return;
        }
        res=JSON.parse(JSON.stringify(res));
  
        if(res[0].utenzaAttiva==0)
          resolve({ message: 'Utenza non attiva', status:500});
        else
          resolve({status:200});
    })});
  }
  
  exports.isExist=(dati,email)=>{
    let query="";
  
    return new Promise(resolve =>{
      if(email)
        query=`select email,id from utente where email= BINARY "${email}"`
      else
        query=`select email,id from utente where email= BINARY "${dati.identificativo}" or username= BINARY "${dati.identificativo}"`
  
      sql.query(query,(err, res) => {
        if (err) {
          console.log("error: ", err);
          res.status(500).send({message:err.message})
        }
  
        resolve(JSON.parse(JSON.stringify(res)));
    })}); 
  }