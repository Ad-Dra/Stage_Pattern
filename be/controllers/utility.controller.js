
var jwt = require('jsonwebtoken');
const sql = require("../config/db.js");
const tokenConfig = require("../config/token.config");
const nodeMailer=require("nodemailer");

exports.verifyToken=async (req,res,next)=>{
    if(req.originalUrl!='/api/login.json' && !req.originalUrl.includes('/api/auth')){
        token=JSON.parse(JSON.stringify(req.headers)).authorization;

        if(token!="null" && token!=undefined){
            jwt.verify(token,tokenConfig.KEY, function(err, _tokendata) {
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
        query=`select email,idUtente from utente where email= BINARY "${email}"`
      else
        query=`select email,idUtente from utente where email= BINARY "${dati.identificativo}" or username= BINARY "${dati.identificativo}"`
  
      sql.query(query,(err, res) => {
        if (err) {
          console.log("error: ", err);
          res.status(500).send({message:err.message})
        }
  
        resolve(JSON.parse(JSON.stringify(res)));
    })}); 
  }

  exports.createToken=(items,expiresIn)=>{
    return jwt.sign(items,tokenConfig.KEY, {expiresIn : expiresIn});
  }

  exports.sendMail=(subject,html,_email)=>{
    return new Promise(async resolve =>{ 
      let transporter= nodeMailer.createTransport({
        host:"smtp.gmail.com",
        port: 587,
        secure:false,
        auth: {
          user: 'draibinadnan@gmail.com',
          pass: 'skuyywrswdfdpxvc'
        }
      })
      
  
      let mailOptions={
        from:'"Meee"',
        to:_email ? _email : await this.getEmailUtente,
        subject: subject,
        html: html
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          resolve(error);
        } 
          console.log('Email sent: ' + info.response);
          resolve(info.response);
      }); 
    }); 
  }

  exports.verifyTokenForEmail=(token)=>{
    return new Promise(resolve =>{
      jwt.verify(token,tokenConfig.KEY, function(err, tokendata) {
        if (err) {
          console.log("error: ", err);
          resolve(err);
        }
        resolve(tokendata);
    })}); 
  }