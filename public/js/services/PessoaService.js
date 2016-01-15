app.factory('Pessoa', function ($http, $resource) {
    return $resource('pessoa/:id');
});

    // return {
    //     pessoa: $resource('pessoa/:id', {}, {
    //         'update': { method:'PUT'} 
    //     }),
    //     endereco: $resource('/pessoa/:id/endereco/:idEndereco', {}, {
    //         'update': { method:'PUT' } 
    //     }),
    //     contato: $resource('/pessoa/:id/telefone/:idTelefone', {}, {
    //         'update': { method:'PUT' } 
    //     }),
    //     membro: $resource('/pessoa/:id/membro/:idMembro', {}, {
    //         'update': { method:'PUT' } 
    //     })    	 
    // };