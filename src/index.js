const express = require('express');
const Handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const morgan = require('morgan');
const  {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');

//initialization
const app = express();
require('./database');

//setting
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname,'views'));
app.engine('.hbs', exphbs({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    defaultLayout:'main',
    layoutsDir:path.join(app.get('views'),'layout'),
    partialsDir:path.join(app.get('views'),'partials'),
    extname:'.hbs'
}));
app.set('view engine','hbs');

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'));
app.use(session({
    secret: 'CGMotos',
    resave: true,
    saveUninitialized: true
}));

//Rutas
app.use(require('./routes/index'));
app.use(require('./routes/users'))

//Static files
app.use('/static', express.static(path.join(__dirname,'public')))
//server listening

app.listen(app.get('port'), ()=>{
    console.log('servidor corriendo en el puerto', app.get('port'));
});

