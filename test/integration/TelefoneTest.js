var app = require('../../app'),
    request = require('supertest'),
    should = require('should'),
    Pessoa = require('../../models').Pessoa,
    Telefone = require('../../models').Telefone;

var pessoa,
    telefone;


describe('Teste do Controller de Telefone:', function() {
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
        
        telefone = {
            //idTelefone: idTelefone,
            //idPessoa: req.body.idPessoa,
            ddd: 21,
            numero: 33428879,
            tipo: 1
        };
        
        Pessoa.create(pessoa).bind(this).then(function (pessoaCriada) {
            
            pessoa.idPessoa = pessoaCriada.idPessoa;
            
            telefone.idPessoa = pessoaCriada.idPessoa;
            
            done();
        });                

    });
    
    afterEach(function() {
         Pessoa.destroy({where: {id_pessoa: pessoa.idPessoa}});
    });
    
    it("Deve ser capaz de listar todos os telefones de uma pessoa", function(done){

        Telefone.create(telefone).bind(this).then(function(criado){
            Telefone.create(telefone).bind(this).then(function(criado1){
                
                request(app).get('/pessoa/'+pessoa.idPessoa+'/telefone')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', 'application/json; charset=utf-8')
                    .expect(200)
                    .end(function(err, res){
                        res.body.should.be.an.instanceOf(Array).and.have.lengthOf(2);
                        res.body[0].should.have.property('ddd', 21);
                        
                        done();
                    });
            });
        });
        
    });
    
    it("Deve ser capaz de salvar um telefone vinculando à uma pessoa", function(done){

        request(app).post('/pessoa/'+pessoa.idPessoa+'/telefone').send(telefone).expect(200).end(
            function(err, res){
                should.exist(res.body);
                should.not.exist(err);
                should.exist(res.body.idPessoa);
                should.exist(res.body.idTelefone);
                done();                
            }
        );        
        
    });
    
    it("Deve ser capaz de obter os dados de um telefone", function(done){

        Telefone.create(telefone).bind(this).then(function(criado){
            
            request(app).get('/pessoa/'+criado.idPessoa+'/telefone/'+criado.idTelefone)
                .set('Accept', 'application/json')
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(200)
                .end(function(err, res){
                    should.not.exist(err);
                    res.body.should.be.an.instanceOf(Object);//.and.have.lengthOf(2);
                    res.body.should.have.property('ddd', 21);
                    done();
                });              
            
        });

    });
    
    it("Deve ser capaz de atualizar os dados de um telefone", function(done){

        Telefone.create(telefone).bind(this).then(function(criado){
            
            criado.ddd = 31;
            request(app).put('/pessoa/'+criado.idPessoa+'/telefone/'+criado.idTelefone).send(criado)
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
    
    it("Deve ser capaz de excluir um telefone de uma pessoa", function(done){

        Telefone.create(telefone).bind(this).then(function(criado){
            request(app).delete('/pessoa/'+criado.idPessoa+'/telefone/'+criado.idTelefone)
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