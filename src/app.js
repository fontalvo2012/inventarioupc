const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const fileUpload = require('express-fileupload');
const app = express();
//setting
require('./database');
app.set('port',process.env.PORT || 80);
app.set('views',path.join(__dirname,'views'));
app.set('file',path.join(__dirname,'file'));

app.engine('.hbs',exphbs({
    defaultLayout:'main',
    extname:'.hbs'
}));

app.set('view engine','.hbs');
//middelware

app.use(fileUpload());
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
    app.locals.success=req.flash('success');
    app.locals.user=req.user;
    next();
}) 
//route
app.use(require('./routes'));
app.use(require('./routes/index'));
app.use(require('./routes/login'));
app.use(require('./routes/inventario'));


//static file
app.use(express.static(path.join(__dirname,'public')));


module.exports= app;