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

    if(us){
        done(null,false,req.flash('login', 'El Usuario ya ha sido registrado'));
    }else{
        const {nombre,firma,perfil}=req.body;
        newUser.username=user;
        newUser.password=bcrypt.hashSync(password);
        newUser.perfil=perfil;
        newUser.nombre=nombre;
        newUser.medico=firma;
        newUser.firma=firma+'.png';     
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

router.get('/login',checkAuthentication,(req, res,next) => {
    res.render('login/index');
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