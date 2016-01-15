var login = require('./login');
var Usuario = require('../../models').Usuario;

module.exports = function(passport){
    
    passport.serializeUser(function(user, done){
        console.log('serialize user: ');
        done(null, user.idUsuario);
    });
    
    passport.deserializeUser(function(id, done){
       Usuario.build({idUsuario: id}).obtemPorID(
           function(usuario){
               done(null, usuario);
           },
           function(error){
               done(error);
           }
        ); 
    });
    
    login(passport);
    
}