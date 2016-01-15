var express = require('express');
var models = require("../models");
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    
    var p = {
        nome: "TESTE TESTE", 
        cpf: '05822753779',
        rg: '214485443',
        nascimento: '1985-05-11',
        estadoCivil: 1,
        naturalidade: 'RJ',
        profissao: 1,
        grauInstrucao: 1,
        sexo: 'M',
        religiao: 'CATÓLICO',
        idiomas: 'PORTUGUÊS'
    };
    
    var Pessoa = models.pessoa.build(p);
    
    Pessoa.save().then(function(pessoa){
        if(pessoa){
            console.log(pessoa.idPessoa);
            console.log('INSERIU A PESSOA: ' + pessoa.nome);
            
            p.idPessoa = pessoa.idPessoa;
            Pessoa.nome = 'RUY DOS SANTOS MATIAS OUTOR ' + p.idPessoa;
            Pessoa.save().then(
                function(pessoaU){
                    console.log('atualizou a pessoa: ' + pessoaU.idPessoa);
                    console.log('atualizou A PESSOA: ' + pessoaU.nome);
                    
                Pessoa.destroy({where: {id_pessoa: pessoaU.idPessoa}});
                    res.json(p);    
            }).catch(
            function(error){
                console.log(error);
            })
        }
    }).catch(
    function(error){
        console.log(error);
    });

    
//    Pessoa.todos( 
//    function(pessoa){
//        
//        if (pessoa){
//            res.json(pessoa);
//        } else {
//		  res.send(401, "Pessoa não encontrada");
//		}
//    },
//    function(error){
//        console.log(error)
//    });

});

module.exports = router;
