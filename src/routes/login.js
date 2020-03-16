const { Router } = require('express');
const router = Router();
var admin = require("firebase-admin");
const bcrypt = require('bcrypt-nodejs');
const passport = require('passport');
const strategy = require('passport-local').Strategy;
const db = admin.firestore();


passport.serializeUser((user, done) => {
    done(null, user.username);
});

passport.deserializeUser(async (username, done) => {
    db.collection('users').where('username', '==', username).get()
        .then((snapshot) => {
            var user = [];
            snapshot.forEach((doc) => {
                user.push(doc.data());
            });
            done(null, user[0]);
        })
        .catch((err) => {
            console.log('Error getting documents', err);
            done(null, { error: 'error' });
        });

});

passport.use('local-singup', new strategy({
    usernameField: 'user',
    passwordField: 'password',
    passReqToCallback: true
}, (req, user, password, done) => {
    const userIn = {
        username: user,
        password: bcrypt.hashSync(password),
        perfil: 0
    };
    db.collection('users').where('username', '==', userIn.username).get()
        .then((snapshot) => {
            var valores = [];
            snapshot.forEach((doc) => {
                valores.push(doc.data());
            });
            if (valores[0]) {
                console.log(valores[0]);
                return done(null, false, req.flash('login', 'No fue creado por que ya existe un usuario con ese nombre.'));
            } else {
                let docRef = db.collection('users').doc();
                let setAda = docRef.set(userIn);
                done(null, userIn);
            }
        })
        .catch((err) => {
            console.log('Error getting documents', err);
        });
}));

passport.use('local-singin', new strategy({
    usernameField: 'user',
    passwordField: 'password',
    passReqToCallback: true
}, (req, user, password, done) => {
    db.collection('users').where('username', '==', user).get()
        .then((snapshot) => {
            var valores = [];
            snapshot.forEach((doc) => {
                valores.push(doc.data());
            });
            if (valores[0]) {
                if (!bcrypt.compareSync(password, valores[0].password)) {
                    return done(null, false, req.flash('login', 'La contraseña es incorrecta'));
                }
                done(null, valores[0]);
            } else {
                return done(null, false, req.flash('login', 'El Usuario No existe'));
            }
        })
        .catch((err) => {
            console.log('Error getting documents', err);
        });
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