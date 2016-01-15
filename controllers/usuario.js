module.exports = function(app){
    
    var controller = {}
    
    var Usuario = app.models.Usuario;
    

    controller.login = function(req, res){
        
        var usuario = {
            'login': req.body.login,
            'senha': req.body.senha
        }

        Usuario.build(usuario).obterPorLogin(
            function(usuario){
                if (usuario){
                    res.json(usuario);
                } else {
                    res.status(403).send('Usuário ou senha inválidos');
                }
            },
            function(error){
                console.log(error);
                res.status(500).send('Erro no acesso');
            }
        );

    }
    
    return controller;
}