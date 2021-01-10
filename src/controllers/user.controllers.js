const usersCtrl = {};

const passport = require("passport");

const User = require('../models/user');

usersCtrl.renderSignUpForm = (req, res) => {
    res.render("user/signup");
};

usersCtrl.signUp = async (req, res) => {
    const errors = [];
    /* console.log(req.body) */
    const { name, email, password, passwordConfirm } = req.body;
    if (password != passwordConfirm){
        errors.push({ text: "No coinciden las contraseñas" });
    }

    if (password.length < 4){
        errors.push({ text: "La contraseña debe ser mayor a 4 caracteres " });
    }

    if (errors.length > 0){

        res.render("user/signup", { errors, name, email })
    } else {
        const emailUsuario = await User.findOne({email});
        if(emailUsuario){
            req.flash('msg_error', 'Datos invalidos');
            res.redirect('/usuario/ingreso');
        } else {
            const newUser = new User({name, email, password})            
            newUser.password = await newUser.encryptPassword(password) 
            await newUser.save();            
            req.flash('msg_exito', 'Registración con exito' );
            res.redirect('/usuario/inicio');
        }
    }
};

    usersCtrl.renderSigninForm = (req, res) => {
        res.render("user/signin");
    };

    usersCtrl.signIn = passport.authenticate('login',{ 
        failureRedirect: '/usuario/inicio',
        successRedirect: '/notas',
        failureFlash: true
     })

    usersCtrl.salir = (req, res) => {
        /* req.session.user = null; */
        req.logout();
        req.flash('msg_exito', 'Sessión Cerrada');
        res.redirect('/')
    };
module.exports = usersCtrl;
