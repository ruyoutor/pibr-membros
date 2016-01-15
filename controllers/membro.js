//var models  = require('../models');

module.exports = function(app){
    
    var controller = {}
    
    var Membro = app.models.Membro;

    controller.obtemTodos = function(req, res){
        
        Membro.build({}).obtemTodos(
            function(membros){
                
                if (membros){
                    res.json(membros);
                } else {
                    res.status(404).json({message: 'Nenhum dado de membros encontrado'});
                }
            },
            function(error){
                console.error(error);
                res.status(500).json(error);
            }
        );
    }
    
    controller.obtemPorPessoa = function(req, res){
        var idPessoa = req.params.id;
        
        Membro.build({idPessoa: idPessoa}).obtemPorIdDaPessoa(
            function(membro){
                if (membro){
                    res.json(membro);
                } else {
                    res.status(404).json({message: 'Dados de membro não cadastrados'});
                }
            },
            function(error){
                console.error(error);
                res.status(500).json(error);
            }
        );
    }
    
    controller.obtemPorID = function(req, res){
        
        var id = req.params.id;
        
        Membro.build({idMembro: id}).obtemPorID(
            function(membro){
                if (membro){
                    res.json(membro);
                } else {
                    res.status(404).json({message: 'Dados de membro não encontrados'});
                }
            }, 
            function(error){
                console.error(error);
                res.status(500).json(error);
            }
        );

    }
    
    controller.salvaMembro = function(req, res){
        
    //    var pessoa = sanitizaPessoa(req);
    
        Membro.build(sanitizaMembro(req)).novo(
            function(criado){
                res.json(criado);
            },
            function(error){
                console.error(error);
                res.status(500).json(error);
            }
        );
    }

    controller.atualiza = function(req, res){

        var id = req.params.idMembro;   
        
        Membro.build(sanitizaMembro(req, id)).atualiza(
            function(atualizado){
            
                if (atualizado){
                    res.json({message: "Atualizado com sucesso"});
                } else {
                    res.status(404).json({message: 'Dados de membro não encontrados'})
                }
            },
            function(error){
                console.error(error);
                res.status(500).json(error);
            }
        );
    }
    
    controller.remove = function(req, res){
        
        var id = req.params.idMembro;
        
        Membro.build({idMembro: id}).remove(
            function(removido){
                
                if (removido){
                    res.json({message: 'Excluido com sucesso'});
                } else {
                    res.status(404).json({message: 'Dados de membro não encontrados'})
                }
            },
            function(error){
                console.error(error);
                res.status(500).json(error);
            }
        );
    }
    
    return controller;
}

function sanitizaMembro(req, idMembro){
    return {
        idMembro: idMembro,
        idPessoa: req.params.id,
        tpAdmissao: req.body.tpAdmissao,
        dtProfissaoFe: req.body.dtProfissaoFe,
        dtBatismo: req.body.dtBatismo,
        nmPastor: req.body.nmPastor,
        situacao: req.body.situacao
    };
}
