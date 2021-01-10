const helpers= {};

helpers.isAuthenticated = (req, res, next) =>{
    if(req.isAuthenticated()){
        
        return next();
    }
    req.flash('msg_error', 'No Autorizado.');
    res.redirect('/usuario/inicio')
}

module.exports = helpers