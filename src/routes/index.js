const { Router } = require('express');
var admin = require("firebase-admin");

const router = Router();
//var serviceAccount = require("../../gpsview-15f80-firebase-adminsdk-y4wtq-64941aee0f.json");
var serviceAccount = require("../../citas-orl-firebase-adminsdk-n4rdb-0454991b52.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
 // databaseURL: "https://gpsview-15f80.firebaseio.com"
  databaseURL: "https://citas-orl.firebaseio.com"
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