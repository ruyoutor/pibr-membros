var app = require('../../app'),
request = require('supertest'),
should = require('should'),
Pessoa = require('../../models').Pessoa;

var pessoa;


describe('Teste do Controller de Pessoa:', function() {
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
        } 
        
        
                
        Pessoa.create(pessoa).bind(this).then(function (pessoaCriada) {
            
            pessoa.idPessoa = pessoaCriada.idPessoa;
            
            done();
        });                

    });
    
    afterEach(function() {
         Pessoa.destroy({where: {id_pessoa: pessoa.idPessoa}});
    });    

    it('Deve ser capaz de trazer uma lista de pessoas', function(done){
   
        request(app).get('/pessoa')
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)
            .end(function(err, res){
                 res.body.should.be.an.instanceOf(Array);
                 res.body[0].should.have.property('nome', 'RUY OUTOR');
                

                done();
            });
        
    });

    it('Deve ser capaz de trazer somente uma pessoa pelo ID', function(done){

        request(app).get('/pessoa/' + pessoa.idPessoa)
            .expect(200)
            .end(function(err, res){
                res.body.should.have.property('idPessoa', pessoa.idPessoa);
                
                done();
            });
        
    });

    it('Deve ser capaz de excluir uma pessoa através do ID', function(done){

        request(app).delete('/pessoa/' + pessoa.idPessoa)
            .expect(200)
            .end(function(err, res){
                res.body.should.have.property('message', 'Removido com sucesso');
                done();
            });
    });
    
    it('Deve ser capaz de salvar uma pessoa sem problemas', function(done){
        
        pessoa.idPessoa = null;
        request(app).post('/pessoa').send(pessoa).expect(200).end(
            function(err, res){
                should.exist(res.body);
                should.not.exist(err);
                should.exist(res.body.idPessoa);
                done();
            }
        );
    });
    
    it('Deve ser capaz de atualizar os dados de uma pessoa sem problemas', function(done){
       
      pessoa.nome = 'RUY PUT';
      request(app).put('/pessoa/' + pessoa.idPessoa).send(pessoa).expect(200).end(
          function(err, res){
              should.not.exist(err);
              res.body.should.have.property('message', 'Atualizado com sucesso');
              done();
          })
        
    });
});
