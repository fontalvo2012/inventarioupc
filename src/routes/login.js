const { Router } = require('express');
const router = Router();
var admin = require("firebase-admin");
const bcrypt = require('bcrypt-nodejs');
const passport = require('passport');
const strategy = require('passport-local').Strategy;
const db = admin.firestore();

const Users=require('../model/users');

passport.serializeUser((user, done) => {   
    done(null, user.username);
});

passport.deserializeUser(async (username, done) => {
    const user = await Users.findOne({username:username}).lean();
    done(null, user); 
});

passport.use('local-singup', new strategy({
    usernameField: 'user',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, user, password, done) => {
    const newUser= new Users();
    const us=await Users.findOne({username:user});
    const {nombre,firma,empleado,p1,p2,p3,p4,jefe}=req.body; 
    
    if (p1=='si') {admin=1;} else{admin=0;}
    if (p2=='si') {sede=1;} else{sede=0;}
    if (p3=='si') {cordinador=1;} else{cordinador=0;}
    if (p4=='si') {despacho=1;} else{despacho=0;}

    if(us){
        done(null,false,req.flash('login', 'La contraseña ha sido cambiada'));
        await Users.updateOne({username:user},
            {
                password:bcrypt.hashSync(password),
                admin,
                cordinador,
                despacho,
                sede,
                jefe,
                empleado
            });
    }else{
            
        if (p1=='si') {newUser.admin=1;} else{newUser.admin=0;}
        if (p2=='si') {newUser.sede=1;} else{newUser.sede=0;}
        if (p3=='si') {newUser.cordinador=1;} else{newUser.cordinador=0;}
        if (p4=='si') {newUser.despacho=1;} else{newUser.despacho=0;}

        newUser.username=user;
        newUser.password=bcrypt.hashSync(password);        
        newUser.nombre=nombre;
        newUser.medico=firma;
        newUser.empleado=empleado;     
        newUser.jefe=jefe;     
        await newUser.save();
        done(null, newUser);
    }    

}));

passport.use('local-singin', new strategy({
    usernameField: 'user',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, user, password, done) => {
    const usuario=await Users.findOne({username:user}).lean();   
    if (usuario) {
        if (!bcrypt.compareSync(password, usuario.password)) {
            return done(null, false, req.flash('login', 'La contraseña es incorrecta'));
        }
        done(null, usuario);
    } else {
        return done(null, false, req.flash('login', 'El Usuario No existe'));
    }
}));

router.get('/login',async(req, res,next) => {
    const users= await Users.find({cordinador:1}).lean();
    res.render('login/index',{users});
});

router.get('/singIn', async (req, res) => {
    res.render('login/ingresar');
});

router.post('/singIn', passport.authenticate('local-singin', {
    successRedirect: '/',
    failureRedirect: '/singIn',
    passReqToCallback: true
}));


router.post('/login', passport.authenticate('local-singup', {
    successRedirect: '/',
    failureRedirect: '/login',
    passReqToCallback: true
}));

router.get('/salir',(req,res)=>{
    req.logOut();
    res.redirect('/singIn');
});

function checkAuthentication(req,res,next){
    if(req.isAuthenticated()){        
        next();
    } else{
        res.redirect("/singIn");
    }
}

module.exports = router;