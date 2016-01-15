var app = require('../../app'),
    request = require('supertest'),
    should = require('should'),
    Pessoa = require('../../models').Pessoa,
    Relacao = require('../../models').Relacao;
    
    
var pessoa1, pessoa2;


describe('Teste do Controller de Relacao:', function() {
    beforeEach(function(done) {
        
        pessoa1 = {
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
        
        pessoa2 = {
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
        
        
        Pessoa.create(pessoa1).bind(this).then(function (pessoaCriada1) {
            
            pessoa1.idPessoa = pessoaCriada1.idPessoa;
            
            Pessoa.create(pessoa2).bind(this).then(function (pessoaCriada2) {
                pessoa2.idPessoa = pessoaCriada2.idPessoa;
                done();
            }); 
        }); 
        
        
        
    });
    
    afterEach(function() {
         Pessoa.destroy({where: {id_pessoa: pessoa1.idPessoa}});
         Pessoa.destroy({where: {id_pessoa: pessoa2.idPessoa}});
    });
    
    it("Deve ser capaz de criar uma relação entre duas pessoas sem problemas", function(done){
        
        request(app).post('/pessoa/'+pessoa1.idPessoa+'/relacao')
            .send({idRelacao: pessoa2.idPessoa, tpRelacao: 1})
            .expect(200).end(
                function(err, res){
                    should.exist(res.body);
                    should.not.exist(err);
                    should.exist(res.body.idPessoa);
                    done();
                }
            );
    });

    
    it("Deve ser capaz de obter os dados da pessoa relacionada sem problemas", function(done){
        
        Relacao.build({idPessoa: pessoa1.idPessoa, idRelacao: pessoa2.idPessoa, tpRelacao: 1}).novo(
            function(relacao){

                request(app).get('/pessoa/'+relacao.idPessoa+'/relacao/'+relacao.idRelacao).expect(200).end(
                    function(err, res){
                        should.exist(res.body);
                        should.not.exist(err);
                        done();
                    }
                );
            },
            function(error){
                console.log(error);
                done();
            }
        )
    });
    
    it("Deve ser capaz de desfazer uma relação sem problemas", function(done){
        
        Relacao.build({idPessoa: pessoa1.idPessoa, idRelacao: pessoa2.idPessoa, tpRelacao: 1}).novo(
            function(relacao){

                request(app).delete('/pessoa/'+relacao.idPessoa+'/relacao/'+relacao.idRelacao).expect(200).end(
                    function(err, res){
                        res.body.should.have.property('message', 'Relação excluida com sucesso');
                        should.exist(res.body);
                        should.not.exist(err);
                        done();
                    }
                );
            },
            function(error){
                console.log(error);
                done();
            }
        )
    });
    
    it("Deve obter pessoas relacionadas sem problemas", function(done){
        
        Relacao.build({idPessoa: pessoa1.idPessoa, idRelacao: pessoa2.idPessoa, tpRelacao: 1}).novo(
            function(relacao1){
                
                var pessoa3 = pessoa2;
                pessoa3.idPessoa = null;
                Pessoa.create(pessoa3).bind(this).then(
                    
                    function(criada){
                        
                        Relacao.build({idPessoa: pessoa1.idPessoa, idRelacao: criada.idPessoa, tpRelacao: 1}).novo(
                            function(relacao2){
                                
                                request(app).get('/pessoa/'+pessoa1.idPessoa+'/relacao').expect(200).end(
                                    function(err, res){
                                        res.body.should.be.an.instanceOf(Array).and.have.lengthOf(2);
                                        should.exist(res.body);
                                        should.not.exist(err);
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
                    
                )

            },
            function(error){
                console.log(error);
                done();
            }
        )
    });    
    

});