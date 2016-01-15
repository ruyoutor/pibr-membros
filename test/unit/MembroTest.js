var expect = require('expect.js');

var Membro = require('../../models').Membro,
Pessoa = require('../../models').Pessoa,
sequelize = require('../../models').sequelize;

var membro, pessoa;

describe('Teste do Modelo Membro: ', function(){
    
    beforeEach(function() {
        
        membro = {
            tpAdmissao: 1,
            dtProfissaoFe: '2015-11-24T00:00:00.000Z',
            dtBatismo: '2015-11-24T00:00:00.000Z',
            nmPastor: 'LUSITANO COUTO',
            situacao: 1
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
        };
        
        return Pessoa.create(pessoa).bind(this).then(function(pessoaCriada){
            pessoa.idPessoa = pessoaCriada.idPessoa;
            membro.idPessoa = pessoaCriada.idPessoa;
        });
    });
    
    after(function() {
         return Pessoa.destroy({where: ['id_pessoa > 0']});
         //done();
    });     
    
    it('Deve ser capaz de salvar uma pessoa mais membro sem problemas', function(done){
        
        Membro.build(membro).novo(
            function(criado){
                expect(criado).to.be.a('object');
                expect(criado.idMembro).to.be.ok();
                done();
            },
            function(error){
                console.error(error);
                done();
            }
        );

    });
            

    it('Deve ser capaz de deletar uma pessoa e seus dados de membro vinculados sem problemas', function(done){
        
        Membro.build(membro).novo(
            function(criado){
              Pessoa.build({idPessoa: criado.idPessoa}).remove(
                  function(removido){
                      expect(removido).to.be.equal(1);
                      Membro.build({idPessoa: membro.idPessoa}).obtemPorIdDaPessoa(
                          function(encontrado){
                              expect(encontrado).to.be.equal(null);
                              done();
                          },
                          function(error){
                              console.error(error);
                              done();
                          }
                      );
                  }, 
                  function(error){
                      console.error(error);
                      done();
                  }
              );
            },
            function(error){
                console.error(error);
                done();
            }
        );

    });        
         

    it('Deve ser capaz de deletar um membro sem problemas', function(done){
        
        Membro.build(membro).novo(
            function(criado){
                Membro.build({idMembro: criado.idMembro}).remove(
                    function(removido){
                        expect(removido).to.be.equal(1);
                        Membro.build({idMembro: criado.idMembro}).obtemPorID(
                            function(encontrado){
                                expect(encontrado).to.be.equal(null);
                                done();
                            },
                            function(error){
                                console.log(error);
                                done();
                            }
                        );
                                      
                    },
                    function(error){
                        console.log(error);
                        done();
                    }
                );
            },
            function(error){
                console.log(error);
                done();
            }
        );

    });    
    
    it('Deve ser capaz de atualizar os dados de um membro sem problemas', function(done){
        
        Membro.build(membro).novo(
            function(criado){
                criado.nmPastor = 'NOME ALTERADO';
                criado.atualiza(
                    function(atualizado){
                        console.log(atualizado);
                        expect(atualizado).to.be.ok();
                        expect(atualizado[0]).to.be.equal(1);
                        done();
                    }, function(error){
                        console.log(error);
                        done();
                    }
                );
            },
            function(error){
                console.log(error);
                done();
            }
        );
    });    
});
