var expect = require('expect.js');

var Telefone = require('../../models').Telefone,
Pessoa = require('../../models').Pessoa,
sequelize = require('../../models').sequelize;

var telefone, pessoa;

describe('Teste do Modelo Telefone: ', function(){
    
    beforeEach(function() {
        
        telefone = {
            //idTelefone: idTelefone,
            //idPessoa: req.body.idPessoa,
            ddd: 21,
            numero: 33428879,
            tipo: 1
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
            telefone.idPessoa = pessoaCriada.idPessoa;
        });
    });
    
    after(function() {
         //Endereco.destroy({where: ['id_endereco > 0']});
         return Pessoa.destroy({where: ['id_pessoa > 0']});
    });     
    
    it('Deve ser capaz de salvar uma pessoa mais telefone sem problemas', function(){
        
        return Telefone.create(telefone).bind(this).then(function(enderecoCriado){
            expect(enderecoCriado.idPessoa).to.equal(pessoa.idPessoa);
                        
            return Telefone.find({where: {id_pessoa: pessoa.idPessoa}}).bind(this).then(function(telefone){
                expect(telefone).to.be.a('object');
            });
        });

    });
            

    it('Deve ser capaz de deletar uma pessoa e seus telefones vinculados sem problemas', function(){
        
        return Telefone.create(telefone).bind(this).then(function(telefoneCriado){

            return Telefone.create(telefone).bind(this).then(function(telefoneCriado2){
                    
                return Pessoa.destroy({where: {id_pessoa: pessoa.idPessoa}}).bind(this).then(function(excluidos){
                    
                    expect(excluidos).to.equal(1);
                    return Telefone.find({where: {id_pessoa: pessoa.idPessoa}}).bind(this).then(function(resultado){
                        expect(resultado).to.equal(null);
                    });
                        
                });
                
            });
            
        });
        
    });        
         

    it('Deve ser capaz de deletar um telefone sem problemas', function(){
        
        return Telefone.create(telefone).bind(this).then(function(telefoneCriado){
            
           expect(telefoneCriado.idEndereco).to.be.ok;
           return telefoneCriado.destroy().bind(this).then(function(excluidos){
               //console.log(excluidos);
               expect(excluidos).to.be.ok;
           });
        });

    });    
    
    it('Deve ser capaz de atualizar um telefone sem problemas', function(){
        
        return sequelize.transaction(function (t) {
        
            return Telefone.create(telefone, {transaction: t}).then(function (telefoneCriado) {
                telefoneCriado.cidade = 'NITEROI';
                return telefoneCriado.save({transaction: t}).bind(this).then(function(atualizado){
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
