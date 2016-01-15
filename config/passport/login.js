var LocalStrategy = require('passport-local').Strategy;
var Usuario = require('../../models').Usuario;
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){
    passport.use('login', new LocalStrategy({
        passReqToCallback : true
    },
    function(req, username, password, done){
        Usuario.build({login: username}).obterPorLogin(
            function(usuario){
                
                if (!usuario){
                    return done(null, false, req.flash('message', 'Usuário não encontrado'));    
                }
                
                if (!usuario.autentica(password)){
                    return done(null, false, req.flash('message', 'Senha inválida'));
                }
                
                return done(null, usuario);
            }, 
            function(error){
                return done(error);
            }
        );
    }));
}

var loginValido = function(usuario, password){
    return bCrypt.compareSync(password, usuario.senha);
}