const { Router } = require('express');
var admin = require("firebase-admin");

const router = Router();
var serviceAccount = require("../../gpsview-15f80-firebase-adminsdk-y4wtq-64941aee0f.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://gpsview-15f80.firebaseio.com"
});
const db=admin.firestore();

function checkAuthentication(req,res,next){
  if(req.isAuthenticated()){        
      next();
  } else{
      res.redirect("/singIn");
  }
}


router.get('/',checkAuthentication,(req,res)=>{ 
  res.render('index');  
});




module.exports = router;