app.controller('pessoaController', function($scope, $filter, $http, Pessoa){

    $scope.pessoa = new Pessoa();
    
    $scope.casado = true;

    $scope.estadosCivil = [
        {id: 1, descricao: 'Solteiro'},
        {id: 2, descricao: 'Casado'},
        {id: 3, descricao: 'Separado'},
        {id: 4, descricao: 'Divorciado'},
        {id: 5, descricao: 'Viúvo'}
    ];
    
    $scope.sexos = [
        {id: 'F', descricao: 'Feminino'},
        {id: 'M', descricao: 'Masculino'}
    ];
    
	$scope.ufs = [
        {uf: 'AC', estado: 'Acre'},
        {uf: 'AL', estado: 'Alagoas'},
        {uf: 'AP', estado: 'Amapá'},
        {uf: 'AM', estado: 'Amazonas'},
        {uf: 'BA', estado: 'Bahia'},
        {uf: 'CE', estado: 'Ceará'},
        {uf: 'DF', estado: 'Distrito Federal'},
        {uf: 'ES', estado: 'Espírito Santo'},
        {uf: 'GO', estado: 'Goiás'},
        {uf: 'MA', estado: 'Maranhão'},			
        {uf: 'MT', estado: 'Mato Grosso'},
        {uf: 'MS', estado: 'Mato Grosso do Sul'},
        {uf: 'MG', estado: 'Minas Gerais'},
        {uf: 'PA', estado: 'Pará'},
        {uf: 'PB', estado: 'Paraíba'},
        {uf: 'PR', estado: 'Paraná'},
        {uf: 'PE', estado: 'Pernambuco'},		
        {uf: 'PI', estado: 'Piauí'},
        {uf: 'RJ', estado: 'Rio de Janeiro'},
        {uf: 'RN', estado: 'Rio Grande do Norte'},
        {uf: 'RS', estado: 'Rio Grande do Sul'},
        {uf: 'RO', estado: 'Rondônia'},
        {uf: 'RR', estado: 'Roraima'},
        {uf: 'SC', estado: 'Santa Catarina'},
        {uf: 'SP', estado: 'São Paulo'},
        {uf: 'SE', estado: 'Sergipe'},
        {uf: 'TO', estado: 'Tocantins'}
    ];
    
    $scope.salvaPessoa = function(){
		$scope.pessoa.$save().then(
		    function(){
  				$scope.mensagem = 'Salvo com sucesso';
			},
		//).catch(
		    function(erro) {
		        console.log(erro);
				$scope.mensagem = {texto: 'Não foi possível salvar'};
    		}
    	);
    }
    
    
    
$scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function() {
    $scope.dt = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
  };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };

  $scope.toggleMin();
  $scope.maxDate = new Date(2020, 5, 22);

  $scope.open1 = function() {
    $scope.popup1.opened = true;
  };

  $scope.open2 = function() {
    $scope.popup2.opened = true;
  };

  $scope.setDate = function(year, month, day) {
    $scope.dt = new Date(year, month, day);
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
  $scope.altInputFormats = ['M!/d!/yyyy'];

  $scope.popup1 = {
    opened: false
  };

  $scope.popup2 = {
    opened: false
  };

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date();
  afterTomorrow.setDate(tomorrow.getDate() + 1);
  $scope.events =
    [
      {
        date: tomorrow,
        status: 'full'
      },
      {
        date: afterTomorrow,
        status: 'partially'
      }
    ];

  $scope.getDayClass = function(date, mode) {
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);

      for (var i = 0; i < $scope.events.length; i++) {
        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  };    
    

});
