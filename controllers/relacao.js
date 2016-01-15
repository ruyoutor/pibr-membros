module.exports = function(app){
    
    var controller = {}
    
    var Pessoa = app.models.Pessoa;
    var Relacao = app.models.Relacao;
    
    controller.obtemPessoasComRelacao = function(req, res){
        
        var id = req.params.id;
        var lista = [];

        Relacao.build({idPessoa: id}).obtemPorIdDaPessoa(
            function(relacoes){
                
                if (relacoes){
                    relacoes.forEach(function(relacao){
                        lista.push(relacao.idRelacao);
                    });
                    
                    listaPessoasRelacionadas(res, lista);

                } else {
                    res.status(404).json({message: 'Nenhuma pessoa relacionada'});
                }
            },
            function(error){
                console.log(error);
                res.status(500).json(error);
            }
        );
        
    }
        
    controller.obtemPessoaDaRelacao = function(req, res){
        
        var idPessoa = req.params.id;
        var idRelacao = req.params.idRelacao;

        Relacao.build({idPessoa: idPessoa, idRelacao: idRelacao}).obtemPorID(
            
            function(pessoa){
                
                if (pessoa){
                    res.json(pessoa);
                } else {
                    res.status(404).json({message: 'Nenhuma pessoa encontrada'});
                }
                
            },
            function(error){
                console.log(error);
                res.status(500).json(error);
            }
        );
    }
    
    controller.criaRelacao = function(req, res){
        
        var id = req.params.id;
        
        var relacao = { idPessoa: id, 
                        idRelacao: req.body.idRelacao, 
                        tpRelacao: req.body.tpRelacao};
                        
        Relacao.build(relacao).novo(
            function(criado){
                res.json(criado);
            },
            function(error){
                console.log(error);
                res.status(500).json(error);
            }
        );
        
    }
    
    controller.desfazRelacao = function(req, res){
        
        var id = req.params.id;
        var idRelacao = req.params.idRelacao;
        
        Relacao.build({idPessoa: id, idRelacao: idRelacao}).remove(
            function(excluido){
                
                if (excluido > 0){
                    res.json({message: 'Relação excluida com sucesso'});
                } else {
                    res.status(404).json({message: 'Nenhuma relação encontrada'})
                }
                
            },
            function(error){
                console.log(error);
                res.status(500).json(error);
            }
        );
            
    }
    
    function listaPessoasRelacionadas(res, lista){
        Pessoa.build().obtemPessoasPorId(lista,
            function(pessoas){
                //console.log(pessoas);
                res.json(pessoas);
            },
            function(error){
                console.log(error);
                res.status(500).json(error);
            }
        );
    }
    
    return controller;
}    