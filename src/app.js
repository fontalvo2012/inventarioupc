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
const {servidor} = require('./keys.js')
app.set('port',process.env.PORT || servidor.port);
app.set('views',path.join(__dirname,'views'));
app.set('file',path.join(__dirname,'file'));

/* app.engine('.hbs',exphbs({
    defaultLayout:'main',
    extname:'.hbs'
})); */

app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  partialsDir: path.join(__dirname, '/views/partials/'),
  helpers: {

    // compare
    compare: function (lvalue, operator, rvalue, options) {
      if (arguments.length < 3) {
        throw new Error("Handlerbars Helper 'compare' needs 2 parameters")
      }

      if (options === undefined) {
        options = rvalue
        rvalue = operator
        operator = '==='
      }

      const operators = {
        // eslint-disable-next-line eqeqeq
        '==': function (l, r) { return l == r },
        '===': function (l, r) { return l === r },
        // eslint-disable-next-line eqeqeq
        '!=': function (l, r) { return l != r },
        '!==': function (l, r) { return l !== r },
        '<': function (l, r) { return l < r },
        '>': function (l, r) { return l > r },
        '<=': function (l, r) { return l <= r },
        '>=': function (l, r) { return l >= r },
        // eslint-disable-next-line valid-typeof
        typeof: function (l, r) { return typeof l === r }
      }

      if (!operators[operator]) {
        throw new Error("Handlerbars Helper 'compare' doesn't know the operator " + operator)
      }

      const result = operators[operator](lvalue, rvalue)

      if (result) {
        return options.fn(this)
      } else {
        return options.inverse(this)
      }
    },
    // fin compare
    // render numero de veces
    times: function (n, block) {
      let accum = ''
      for (let i = 0; i < n; ++i) { accum += block.fn(i) }
      return accum
    },
    // fin render numero de veces
    // operaciones matematicas simples
    math: function (lvalue, operator, rvalue) {
      lvalue = parseFloat(lvalue)
      rvalue = parseFloat(rvalue)
      return {
        '+': lvalue + rvalue,
        '-': lvalue - rvalue,
        '*': lvalue * rvalue,
        '/': lvalue / rvalue,
        '%': lvalue % rvalue
      }[operator]
    },
    // fin operaciones matematicas simples
    formatF: function (fecha) {
      const f = fecha.toLocaleString('es-CO', { timeZone: 'america/bogota' })
      return f
    },
    setTitle: function (title) {
      // Guardar el título en una variable global
      this.title = title
    }
  }
}))

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