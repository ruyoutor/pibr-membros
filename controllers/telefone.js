module.exports = function(app){
    
    var controller = {}
    
    var Telefone = app.models.Telefone;
    

    controller.obtemTodos = function(req, res){
        
        var idPessoa = req.params.id;
        
        Telefone.build({idPessoa: idPessoa}).obtemTodos(
            function(telefones){
                
                if (telefones){
                    res.json(telefones);
                } else {
                    res.send(401, 'Nenhum telefone encontrado');
                }                

            },
            function(error){
                console.log(error);
                res.send(500, error);
            }
        );
    }
    
    controller.salvaTelefone = function(req, res){
        
        Telefone.build(sanitizaTelefone(req)).novo(
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
        
        Telefone.build({idTelefone: req.params.idTelefone}).obtemPorID(
            function(telefone){
                if (telefone){
                    res.json(telefone);
                } else {
                    res.send(404, 'Telefone não encontrado');
                }
            },
            function(error){
                console.log(error);
                res.send(500, error);
            }
        );
        
    }
    
    controller.atualiza = function(req, res){
        
        var idTelefone = req.params.idTelefone;
        
        Telefone.build(sanitizaTelefone(req, idTelefone)).atualiza(
            function(atualizado){
                
                if (atualizado){
                    res.json({message: "Atualizado com sucesso"});
                } else {
                    res.send(404, 'Não encontrado')
                }
                
            },
            function(error){
                console.error(error);
                res.send(500, error);
            }
        );

    }
    
    controller.remove = function(req, res){
        
        var id = req.params.idTelefone;
        
        Telefone.build({idTelefone: id}).remove(
            function(excluido){
                if (excluido){
                    res.json({message: 'Excluido com sucesso'});
                } else {
                    res.json(404, 'Não encontrado');
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

function sanitizaTelefone(req, idTelefone){
    
    return {
        idTelefone: idTelefone,
        idPessoa: req.params.id,
        ddd: req.body.ddd,
        numero: req.body.numero,
        tipo: req.body.tipo
    };
}