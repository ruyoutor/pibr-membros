app.controller('contatoController', function($scope, $filter, $http){
    
    
    $scope.telefones = [];
    
    $scope.tipos = [
         {id: 1, descricao: 'Celular'},
         {id: 2, descricao: 'Fixo'}
    ];
    
    $scope.exibeTipo = function(index) {
        var tel = $scope.telefones[index];
        if (tel){
            var selected = $filter('filter')($scope.tipos, {id: tel.tipo});
            return (tel.tipo && selected.length) ? selected[0].descricao : 'Nenhum';
        }
        return 'Nenhum';
    };    
    
    $scope.salvaContato = function(data, id){
        
    };
    
    $scope.removeContato = function(index){
        $scope.telefones.splice(index, 1);
    };
    
    $scope.novoContato = function(){
        $scope.inserted = {
            id: $scope.telefones.length+1,
            ddd: 21,
            numero: undefined,
            tipo: 1
        }
        $scope.telefones.push($scope.inserted);
    }
    
});