module.exports = function(app){
    
    
    var pessoaCtrl = app.controllers.pessoa;
    var enderecoCtrl = app.controllers.endereco;
    var telefoneCtrl = app.controllers.telefone;
    var membroCtrl = app.controllers.membro;
    var relacaoCtrl = app.controllers.relacao;

    //PESSOA
    app.route('/pessoa')
        .get(pessoaCtrl.obtemTodos)
        .post(pessoaCtrl.salvaPessoa);
        
    app.route('/pessoa/:id')
        .get(pessoaCtrl.obtemPorID)
        //.put(pessoaCtrl.atualiza)
        .delete(pessoaCtrl.remove);
        
    //ENDEREÇO
    app.route('/pessoa/:id/endereco')
        .get(enderecoCtrl.obtemTodos)
        .post(enderecoCtrl.salvaEndereco);        
        
    app.route('/pessoa/:id/endereco/:idEndereco')
        .get(enderecoCtrl.obtemPorID)
        .put(enderecoCtrl.atualiza)
        .delete(enderecoCtrl.remove);
        
    //TELEFONE
    app.route('/pessoa/:id/telefone')
        .get(telefoneCtrl.obtemTodos)
        .post(telefoneCtrl.salvaTelefone);        
        
    app.route('/pessoa/:id/telefone/:idTelefone')
        .get(telefoneCtrl.obtemPorID)
        .put(telefoneCtrl.atualiza)
        .delete(telefoneCtrl.remove);  
        
    //MEMBRO
    app.route('/pessoa/:id/membro')
        .get(membroCtrl.obtemPorPessoa)
        .post(membroCtrl.salvaMembro);
        
    app.route('/pessoa/:id/membro/:idMembro')
        //.get(membroCtrl.obtemPorID)
        .put(membroCtrl.atualiza)
        .delete(membroCtrl.remove);   

    //RELACAO
    app.route('/pessoa/:id/relacao')
        .get(relacaoCtrl.obtemPessoasComRelacao)
        .post(relacaoCtrl.criaRelacao);
        
    app.route('/pessoa/:id/relacao/:idRelacao')        
        .get(relacaoCtrl.obtemPessoaDaRelacao)
        .delete(relacaoCtrl.desfazRelacao);
        
};
