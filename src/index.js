const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');

//initialization
const app = express();
require('./database');

//setting
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname,'views'));
app.engine('.hbs', exphbs({
    defaultLayout:'main',
    layoutsDir:path.join(app.get('views'),'layout'),
    partialsDir:path.join(app.get('views'),'partials'),
    extname:'.hbs'
}));
app.set('view engine','hbs');
//routes
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'));
app.use(session({
    secret: 'CGMotos',
    resave: true,
    saveUninitialized: true
}));


app.use(require('./routes/index'));
app.use(require('./routes/users'))

//Static files
app.use(express.static(path.join(__dirname,'public')))
//server listening

app.listen(app.get('port'), ()=>{
    console.log('servidor corriendo en el puerto', app.get('port'));
});
