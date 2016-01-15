var app = require('../../app'),
    request = require('supertest'),
    should = require('should'),
    Pessoa = require('../../models').Pessoa,
    Membro = require('../../models').Membro;

var pessoa,
    membro;


describe('Teste do Controller de Membro:', function() {
    beforeEach(function(done) {
        
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
        
        membro = {
            tpAdmissao: 1,
            dtProfissaoFe: '2015-11-24T00:00:00.000Z',
            dtBatismo: '2015-11-24T00:00:00.000Z',
            nmPastor: 'LUSITANO COUTO',
            situacao: 1
        };
        
        Pessoa.create(pessoa).bind(this).then(function (pessoaCriada) {
            
            pessoa.idPessoa = pessoaCriada.idPessoa;
            
            membro.idPessoa = pessoaCriada.idPessoa;
            
            done();
        });                

    });
    
    afterEach(function() {
        Pessoa.destroy({where: {id_pessoa: pessoa.idPessoa}});
    });
    
    it("Deve ser capaz de retornar os dados de membro de uma pessoa a partir do ID da pessoa", function(done){

        Membro.create(membro).bind(this).then(function(criado){

                request(app).get('/pessoa/'+pessoa.idPessoa+'/membro')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', 'application/json; charset=utf-8')
                    .expect(200)
                    .end(function(err, res){
                        should.not.exist(err);
                        res.body.should.be.an.instanceOf(Object);
                        res.body.should.have.property('nmPastor', 'LUSITANO COUTO');
                        done();
                    });
            });

    });
    
    it("Deve ser capaz de salvar um membro vinculando à uma pessoa", function(done){

        request(app).post('/pessoa/'+pessoa.idPessoa+'/membro').send(membro).expect(200).end(
            function(err, res){
                should.exist(res.body);
                should.not.exist(err);
                should.exist(res.body.idPessoa);
                should.exist(res.body.idMembro);
                done();                
            }
        );        
        
    });
    
    it("Deve ser capaz de atualizar os dados de um membro", function(done){

        Membro.create(membro).bind(this).then(function(criado){
            
            criado.tpAdmissao = 2;
            request(app).put('/pessoa/'+criado.idPessoa+'/membro/'+criado.idMembro).send(criado)
                .set('Accept', 'application/json')
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(200)
                .end(function(err, res){
                    should.not.exist(err);
                    res.body.should.have.property('message', 'Atualizado com sucesso');
                    done();
                });
        });

     });
    
    it("Deve ser capaz de excluir dados de um membro", function(done){

        Membro.create(membro).bind(this).then(function(criado){
            request(app).delete('/pessoa/'+criado.idPessoa+'/membro/'+criado.idMembro)
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(200)
                .end(function(err, res){
                    should.not.exist(err);
                    res.body.should.have.property('message', 'Excluido com sucesso');
                    done();
                });
        });
    });

});    