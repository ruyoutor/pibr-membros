module.exports = function(app){
    
    var controller = {};
    
    var Pessoa = app.models.pessoa;
    
    controller.listaPessoas = function(req, res){
        var promise = Pessoa.build({}).todos();
        
		promise.then(
			function(pessoas){
				console.log(pessoas);
				res.json(pessoas);
			},
			function(erro){
				console.error(erro);
				res.status(500).json(erro);
			}
		);        
        
    }
    
    controller.obtemPessoa = function(req, res){
        
    }
    
    controller.removePessoa = function(req, res){
        
    }
    
    controller.salvaPessoa = function(req, res){
        
    }
    
    
}