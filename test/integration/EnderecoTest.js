var app = require('../../app'),
    request = require('supertest'),
    should = require('should'),
    Pessoa = require('../../models').Pessoa,
    Endereco = require('../../models').Endereco;

var pessoa,
    endereco;


describe('Teste do Controller de Endereco:', function() {
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
                
        Pessoa.create(pessoa).bind(this).then(function (pessoaCriada) {
            
            pessoa.idPessoa = pessoaCriada.idPessoa;
            
            endereco.idPessoa = pessoaCriada.idPessoa;
            
            done();
        });                

    });
    
    afterEach(function() {
         Pessoa.destroy({where: {id_pessoa: pessoa.idPessoa}});
    });
    
    it("Deve ser capaz de listar todos os endereços de uma pessoa", function(done){

        Endereco.create(endereco).bind(this).then(function(criado){
            Endereco.create(endereco).bind(this).then(function(criado1){
                
                request(app).get('/pessoa/'+pessoa.idPessoa+'/endereco')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', 'application/json; charset=utf-8')
                    .expect(200)
                    .end(function(err, res){
                        res.body.should.be.an.instanceOf(Array).and.have.lengthOf(2);
                        res.body[0].should.have.property('bairro', 'ROCHA');
                        
                        done();
                    });
            });
        });
        
    });
    
    it("Deve ser capaz de salvar um endereço vinculando à uma pessoa", function(done){

        request(app).post('/pessoa/'+pessoa.idPessoa+'/endereco').send(endereco).expect(200).end(
            function(err, res){
                
                should.exist(res.body);
                should.not.exist(err);
                should.exist(res.body.idPessoa);
                should.exist(res.body.idEndereco);
                done();                
            }
        );        
        
    });
    
    it("Deve ser capaz de obter os dados de um endereço", function(done){

        Endereco.create(endereco).bind(this).then(function(criado){
            
            request(app).get('/pessoa/'+criado.idPessoa+'/endereco/'+criado.idEndereco)
                .set('Accept', 'application/json')
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(200)
                .end(function(err, res){
                    should.not.exist(err);
                    res.body.should.be.an.instanceOf(Object);//.and.have.lengthOf(2);
                    res.body.should.have.property('bairro', 'ROCHA');
                    done();
                });              
            
        });

    });
    
    it("Deve ser capaz de atualizar os dados de um endereço", function(done){

        Endereco.create(endereco).bind(this).then(function(criado){
            
            criado.bairro = 'CENTRO';
            request(app).put('/pessoa/'+criado.idPessoa+'/endereco/'+criado.idEndereco).send(criado)
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
    
    it("Deve ser capaz de excluir um endereço de uma pessoa", function(done){

        Endereco.create(endereco).bind(this).then(function(criado){
            request(app).delete('/pessoa/'+criado.idPessoa+'/endereco/'+criado.idEndereco)
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