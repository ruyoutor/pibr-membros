module.exports = function(app){
    
    
    var passport = app.passport;
    
	app.route('/login').post(passport.authenticate('login', {
	 	successRedirect: '/',
	 	failureRedirect: '/',
	 	failureFlash : true  
	}));    
    
//    app.route('/login').post(usuario.login);
}