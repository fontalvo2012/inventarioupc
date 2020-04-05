const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const app = express();


//setting
app.set('port',process.env.PORT || 4000);
app.set('views',path.join(__dirname,'views'));
app.set('file',path.join(__dirname,'file'));

app.engine('.hbs',exphbs({
    defaultLayout:'main',
    extname:'.hbs'
}));

app.set('view engine','.hbs');
//middelware
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(session({
    secret:'myscretsession',
    resave: false,
    saveUninitialized:false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use((req,res,next)=>{
    app.locals.login=req.flash('login');
    app.locals.user=req.user;
    next();
}) 
//route
app.use(require('./routes'));
app.use(require('./routes/index'));
app.use(require('./routes/citas'));
app.use(require('./routes/medicos'));
app.use(require('./routes/item'));
app.use(require('./routes/pacientes'));
app.use(require('./routes/entidades'));
app.use(require('./routes/miempresa'));
app.use(require('./routes/facturacion'));
app.use(require('./routes/login'));
app.use(require('./routes/hclinicas'));

//static file
app.use('/public',express.static(path.join(__dirname,'public')));


module.exports= app;