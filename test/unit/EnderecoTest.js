var expect = require('expect.js');

var Endereco = require('../../models').Endereco,
Pessoa = require('../../models').Pessoa,
sequelize = require('../../models').sequelize;

var endereco, pessoa;

describe('Teste do Modelo Endereco: ', function(){
    
    beforeEach(function() {
        
        endereco = {
            cep: 24421530,
            rua: 'OSVALDO NUNES',
            numero: 141,
            complemento: 'CASA 01',
            bairro: 'ROCHA',
            cidade: 'SÃO GONÇALO',
            uf: 'RJ',
            ref: 'ENTRAR NA RUA AO LADO DO RESTAURANTE BOI A KILO. APÓS, PRIMEIRA A DIREITA'            
        };
    
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
        
        return Pessoa.create(pessoa).bind(this).then(function(pessoaCriada){
            pessoa.idPessoa = pessoaCriada.idPessoa;
            endereco.idPessoa = pessoaCriada.idPessoa;
        });
    });
    
    after(function() {
         //Endereco.destroy({where: ['id_endereco > 0']});
         return Pessoa.destroy({where: ['id_pessoa > 0']});
    });     
    
    it('Deve ser capaz de salvar uma pessoa mais endereco sem problemas', function(){
        
        return Endereco.create(endereco).bind(this).then(function(enderecoCriado){
            expect(enderecoCriado.idPessoa).to.equal(pessoa.idPessoa);
                        
            return Endereco.find({where: {id_pessoa: pessoa.idPessoa}}).bind(this).then(function(enderecos){
                expect(enderecos).to.be.a('object');
            });
        });

    });
            

    it('Deve ser capaz de deletar uma pessoa e seus enderecos vinculados sem problemas', function(){
        
        return Endereco.create(endereco).bind(this).then(function(enderecoCriado){

            return Endereco.create(endereco).bind(this).then(function(enderecoCriado2){
                    
                return Pessoa.destroy({where: {id_pessoa: pessoa.idPessoa}}).bind(this).then(function(excluidos){
                    
                    expect(excluidos).to.equal(1);
                    return Endereco.find({where: {id_pessoa: pessoa.idPessoa}}).bind(this).then(function(resultado){
                        expect(resultado).to.equal(null);
                    });
                        
                });
                
            });
            
        });
        
    });        
         

    it('Deve ser capaz de deletar um endereco sem problemas', function(){
        
        return Endereco.create(endereco).bind(this).then(function(enderecoCriado){
            
           expect(enderecoCriado.idEndereco).to.be.ok;
           return enderecoCriado.destroy().bind(this).then(function(excluidos){
               //console.log(excluidos);
               expect(excluidos).to.be.ok;
           });
        });

    });    
    
    it('Deve ser capaz de atualizar um endereco sem problemas', function(){
        
        return sequelize.transaction(function (t) {
        
            return Endereco.create(endereco, {transaction: t}).then(function (enderecoCriado) {
                enderecoCriado.cidade = 'NITEROI';
                return enderecoCriado.save({transaction: t}).bind(this).then(function(atualizado){
                    expect(atualizado.cidade).to.equal('NITEROI');
                });
            });

        }).then(function (result) {
            //console.log(result);
        }).catch(function (err) {
            console.log(err);
        });        
        
        
        
        // return Endereco.create(endereco).bind(this).then(function(enderecoCriado){
            
        //     expect(enderecoCriado.idEndereco).to.be.ok;
        //     endereco.idEndereco = enderecoCriado.idEndereco
        //     endereco.cidade = 'NITEROI';
            
        //     enderecoCriado.cidade = 'NITEROI';
        //     return enderecoCriado.save().bind(this).then(function(atualizado){
        //         expect(atualizado.cidade).to.equal('NITEROI');
        //     });

        // });

    });    
});
