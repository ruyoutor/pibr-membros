var isAuthenticated = function (req, res, next) {
	if (req.isAuthenticated()){
		return next();
	}
	signin(req, res);
}

var index = function(req, res) {
	res.render('index');
}

var signin = function(req, res) {
	signout(req, res);
}


var signout= function(req, res) {
	if (req.isAuthenticated()){
		req.logout();
	}
	res.render('signin');
}

module.exports = function(app){
    
    app.route('/').get(isAuthenticated, index);
    
    app.route('/signin').get(signin);
    
    app.route('/cadastro').get(
    	function(req, res){
    		res.render('cadastro_pessoa');
    	});
    
    app.route('/signout').get(signout);
    
}

