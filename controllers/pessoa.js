//var models  = require('../models');

module.exports = function(app){
    
    var controller = {}
    
    var Pessoa = app.models.Pessoa;
    var Relacao = app.models.Relacao;
    
    controller.obtemTodos = function(req, res){
        
        Pessoa.build({}).obtemTodos(
            function(pessoas){
                
                if (pessoas){
                    res.json(pessoas);
                } else {
                    res.send(404, 'Nenhuma pessoa encontrado');
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
        
        Pessoa.build({idPessoa: id}).obtemPorID(
            function(pessoa){
                if (pessoa){
                    res.json(pessoa);
                } else {
                    res.send(404, 'Nenhuma pessoa encontrada');
                }
            }, 
            function(error){
                console.error(error);
                res.status(500).json(error);
            }
        );

    }
    
    controller.salvaPessoa = function(req, res){
        
        if (req.body.idPessoa){
            return controller.atualiza(req, res);
        }
        
        controller.salva(req, res);
    }
    
    controller.salva = function(req, res){

        sanitiza(Pessoa.build(), req).novo(
        //Pessoa.build(sanitizaPessoa(req)).novo(
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
        
        Pessoa.build({idPessoa: req.body.idPessoa}).obtemPorID(
            function(pessoa){
                if (pessoa){
                    sanitiza(pessoa, req).save().then(
                    //pessoa.save().then(
                        function(atualizado){
                            res.status(201).json(pessoa.toJSON());
                        },
                        function(error){
                            console.log(error);
                            res.status(500).json({message: 'Erro na atualização dos dados'});
                        }
                    );
                }
            },
            function(error){
                console.error(error);
                res.status(500).json({message: 'Erro na atualização dos dados'});
            }
        );
        //}


        
        // Pessoa.build(sanitizaPessoa(req)).atualiza(
        //     function(atualizado){
        //         if (atualizado){
        //             res.json({message: "Atualizado com sucesso", atualizado: atualizado});
        //         } else {
        //             res.send(404, 'Não encontrado')
        //         }
        //     },
        //     function(error){
        //         console.error(error);
        //         res.status(500).json(error);
        //     }
        // );

    }
    
    controller.remove = function(req, res){
        
        var id = req.params.id;
        
        Pessoa.build({idPessoa: id}).remove(
            function(removido){
                
                if (removido){
                    res.json({message: 'Removido com sucesso'});
                } else {
                    res.send(404, 'Registro não encontrado');
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

// function sanitizaPessoa(req){
//   return {
//     idPessoa: req.body.idPessoa,
//     nome: req.body.nome, 
//     cpf: req.body.cpf,
//     rg: req.body.rg,
//     orgaoExpedidor: req.body.orgaoExpedidor,
//     nascimento: req.body.nascimento,
//     estadoCivil: req.body.estadoCivil,
//     naturalidade: req.body.naturalidade,      
//     profissao: req.body.profissao,
//     grauInstrucao: req.body.grauInstrucao,
//     sexo: req.body.sexo,
//     religiao: req.body.religiao,
//     idiomas: req.body.idiomas,
//     email: req.body.email
//   }
// }

function sanitiza(pessoa, req){
  //return {
    //idPessoa: req.body.idPessoa,
    pessoa.nome = req.body.nome; 
    pessoa.cpf = req.body.cpf;
    pessoa.rg = req.body.rg;
    pessoa.orgaoExpedidor = req.body.orgaoExpedidor;
    pessoa.nascimento = req.body.nascimento;
    pessoa.estadoCivil = req.body.estadoCivil;
    pessoa.naturalidade = req.body.naturalidade;
    pessoa.profissao = req.body.profissao;
    pessoa.grauInstrucao = req.body.grauInstrucao;
    pessoa.sexo = req.body.sexo;
    pessoa.religiao = req.body.religiao;
    pessoa.idiomas = req.body.idiomas;
    pessoa.email = req.body.email;
    return pessoa;
  //}
}
