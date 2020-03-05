const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const app = express();


//setting
app.set('port',process.env.PORT || 4000);
app.set('views',path.join(__dirname,'views'));

app.engine('.hbs',exphbs({
    defaultLayout:'main',
    extname:'.hbs'
}));

app.set('view engine','.hbs');
//middelware
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));

//route
app.use(require('./routes'));
app.use(require('./routes/index'));
app.use(require('./routes/citas'));
app.use(require('./routes/medicos'));
app.use(require('./routes/item'));
app.use(require('./routes/pacientes'));
app.use(require('./routes/entidades'));




//static file
app.use(express.static(path.join(__dirname,'public')));


module.exports= app;