const { Router } = require('express');
var admin = require("firebase-admin");

const router = Router();
var serviceAccount = require("../../gpsview-15f80-firebase-adminsdk-y4wtq-64941aee0f.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://gpsview-15f80.firebaseio.com"
});
const db=admin.firestore();



router.get('/',(req,res)=>{
   res.render('index')
});





module.exports = router;