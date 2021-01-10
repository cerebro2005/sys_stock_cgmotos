const express = require('express');
const path = require('path');
const _handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const methodOverride = require('method-override');
const  {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const session = require('express-session')
const flash = require('connect-flash');



//inicializacion
const app = express();
require('./config/passport')

//config
app.set('port', process.env.PORT || 3000 );
app.set('views', path.join(__dirname,'views'));

app.engine('.hbs', exphbs({
    handlebars: allowInsecurePrototypeAccess(_handlebars),
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layout'),
    partialsDir:  path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine','.hbs');

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'));
app.use(session({
    secret: 'cgmotos',
    resave: true,
    saveUninitialized: true
}));



//vaiables globales

app.use((req,res,next)=> {
    /* res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null; */
    next();
})

//rutas
app.use(require('./routes/index.route'));
app.use(require('./routes/notes.route'));
app.use(require('./routes/users.route'));

//archivos estaticos como ser el css o fuente de letras
app.use(express.static(path.join(__dirname,'public'))) 

module.exports = app;