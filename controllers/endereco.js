module.exports = function(app){
    
    var controller = {}
    
    var Endereco = app.models.Endereco;
    

    controller.obtemTodos = function(req, res){
        
        var idPessoa = req.params.id;
        
        Endereco.build({idPessoa: idPessoa}).obtemTodos(
            function(enderecos){
                
                if (enderecos){
                    res.json(enderecos);
                } else {
                    res.send(401, 'Nenhum endereco encontrado');
                }                

            },
            function(error){
                console.log(error);
                res.send(500, error);
            }
        );
    }
    
    controller.salvaEndereco = function(req, res){
        
        Endereco.build(sanitizaEndereco(req)).novo(
            function(criado){
                res.json(criado);
            },
            function(error){
                console.log(error);
                res.send(500, error);
            }
        );
    }
        
    controller.obtemPorID = function(req, res){
        
        Endereco.build({idEndereco: req.params.idEndereco}).obtemPorID(
            function(endereco){
                if (endereco){
                    res.json(endereco);
                } else {
                    res.send(401, 'Endereco não encontrado');
                }
            },
            function(error){
                console.log(error);
                res.send(500, error);
            }
        );
        
    }
    
    controller.atualiza = function(req, res){
        
        var idEndereco = req.params.idEndereco;
        
        Endereco.build(sanitizaEndereco(req, idEndereco)).atualiza(
            function(atualizado){
                
                if (atualizado){
                    res.json({message: "Atualizado com sucesso"});
                } else {
                    res.send(401, 'Não encontrado')
                }
                
            },
            function(error){
                console.error(error);
                res.send(500, error);
            }
        );

    }
    
    controller.remove = function(req, res){
        
        var id = req.params.idEndereco;
        
        Endereco.build({idEndereco: id}).remove(
            function(excluido){
                if (excluido){
                    res.json({message: 'Excluido com sucesso'});
                } else {
                    res.json(401, 'Não encontrado');
                }
            },
            function(error){
                console.error(error);
                res.send(500, error)
            }
        );
 
    }
    
    return controller;
}

function sanitizaEndereco(req, idEndereco){
    
    return {
        idEndereco: idEndereco,
        idPessoa: req.params.id,
        cep: req.body.cep,
        rua: req.body.rua,
        numero: req.body.numero,
        complemento: req.body.complemento,
        bairro: req.body.bairro,
        cidade: req.body.cidade,
        uf: req.body.uf,
        ref: req.body.ref
    };

}