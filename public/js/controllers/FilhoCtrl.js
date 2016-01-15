app.controller('filhoController', function($scope, $filter, $http) {
    
    // we will store all of our form data in this object
    $scope.formData = {};
    
    $scope.pessoa = {};
    
    $scope.filhos = [];
    
    $scope.novoFilho = function() {
        $scope.inserted = {
            id: $scope.filhos.length+1,
            nome: '',
            nascimento: null,
            isNew: true 
        };
        $scope.filhos.push($scope.inserted);
    };
    
    $scope.checkName = function(data, id) {
      
      if (!data || data === ''){
          return "Informe o nome do filho";    
      }
      
      return haNomeRepetido($scope.filhos, data, $filter);
    }; 
  
    $scope.removeFilho = function(index) {
        $scope.filhos.splice(index, 1);
    };
    
    $scope.cancel = function(index){
        this.removeFilho(index);
    }
    
  $scope.salvaFilho = function(data, id) {
    //$scope.user not updated yet
    
    // angular.extend(data, {id: id});
    // //return $http.post('/saveUser', data);
    // var filho = $filter('filter')($scope.filhos, {id: data.id})
    // filho.persistido = true;
    
    // console.log(JSON.stringify(data));
    // console.log(JSON.stringify(filho));
  };    
    
});

function haNomeRepetido(filhos, novoFilho, $filter){
    var repetido = $filter('filter')(filhos, {nome: novoFilho},
        function(obj1, obj2){
            return angular.equals(obj1, obj2);
        });

    if (repetido.length >= 1 && filhos.length > 1){
        return "Já existe um filho com esse nome";    
    }
}