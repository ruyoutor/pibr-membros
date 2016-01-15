var app = angular.module('MembrosApp', ['ngResource', 'ngAnimate', 'xeditable', 'ui.router', 'ui.bootstrap']);

//module('App', ['ngResource', 'ngRoute', 'angular-table', 'ngSanitize', 'angularModalService', 'ngBootbox', 'ui.bootstrap']);



app.config(function($stateProvider, $urlRouterProvider) {
    
    $stateProvider
    
        // route to show our basic form (/form)
        .state('form', {
            url: '/form_membros',
            templateUrl: 'partials/form_membros.html'
        })
        
        .state('form.pessoais', {
            url: '/pessoais',
            templateUrl: '/partials/form_dados_pessoais.html',
            controller: 'pessoaController'
        })        
        
        // nested states 
        // each of these sections will have their own view
        // url will be nested (/form/profile)
        .state('form.contato', {
            url: '/contato',
            templateUrl: '/partials/form_dados_contato.html',
            controller: 'contatoController'
        })
        
        // url will be /form/interests
        .state('form.endereco', {
            url: '/endereco',
            templateUrl: '/partials/form_dados_endereco.html',
            controller: 'enderecoController'
        })
        
        // url will be /form/payment
        // .state('form.conjuge', {
        //     url: '/conjuge',
        //     templateUrl: '/partials/form_dados_conjuge.html',
        //     controller: 'membroController'
        // })
        
        .state('form.filhos', {
            url: '/filhos',
            templateUrl: '/partials/form_dados_filhos.html',
            controller: 'filhoController'
        })
        
        .state('form.profissao', {
            url: '/profissao',
            templateUrl: '/partials/form_dados_profissionais.html',
            controller: 'profissaoController'
        })
        
        .state('form.batismo', {
            url: '/batismo',
            templateUrl: '/partials/form_dados_batismo.html',
            controller: 'batismoController'
        });        
       
    // catch all route
    // send users to the form page 
    $urlRouterProvider.otherwise('/form_membros/pessoais');
})

.run(function(editableOptions, editableThemes) {
    editableThemes.bs3.inputClass = 'input-sm';
    editableThemes.bs3.buttonsClass = 'btn-sm';
    editableOptions.theme = 'bs3';

});
