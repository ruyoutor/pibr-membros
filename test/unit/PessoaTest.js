var expect = require('expect.js');

//var app = require('../app');
//var should = require('should');
//var Pessoa = app.models.pessoa;

var Pessoa = require('../../models').Pessoa;
var Relacao = require('../../models').Relacao;

var pessoa;

describe('Teste do Modelo Pessoa: ', function(){
    
    beforeEach(function() {
        
        pessoa = {
            nome:"RUY OUTOR",
            cpf:"05822753779",
            rg:"214485443",
            orgaoExpeditor:"dic",
            nascimento:"1985-05-11T00:00:00.000Z",
            estadoCivil:"1",
            naturalidade:"RJ",
            profissao:1,
            grauInstrucao:1,
            sexo:"M",
            religiao:"CATÓLICO",
            idiomas:"PORTUGUÊS",
        } 
        
        //done();

    });
    
    afterEach(function() {
         //Pessoa.destroy({where: ['id_pessoa > 0']});
    });     
    
    it('Deve ser capaz de salvar a pessoa sem problemas', function(){
            
        return Pessoa.create(pessoa).bind(this).then(
            function (pessoaCriada) {
                pessoa.idPessoa = pessoaCriada.idPessoa;
                expect(pessoaCriada.nome).to.equal('RUY OUTOR');
                //done();
            });
    });


    it('Deve ser capaz de deletar uma pessoa sem problemas', function(){
         
        return Pessoa.create(pessoa).bind(this).then(function (pessoaCriada) {
            
            return Pessoa.destroy({where: {id_pessoa: pessoaCriada.idPessoa}}).bind(this).then(
                function (excluido) {
                    expect(excluido).to.equal(1);
                });
        });
         
    });
    
    it('Deve ser capaz de atualizar os dados de uma pessoa sem problemas', function(){
           
        return Pessoa.create(pessoa).bind(this).then(function (pessoaCriada) {
            pessoa.nome = 'RUY UPDATE';
            pessoa.idPessoa = pessoaCriada.idPessoa;

              
            return Pessoa.update(pessoa, {where: {id_pessoa: pessoa.idPessoa}}).bind(this).then(
                function (atualizado) {
                    expect(atualizado[0]).to.equal(1);
                  // done();
            });
        });

    });    
});
