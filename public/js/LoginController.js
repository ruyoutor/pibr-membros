angular.module('pibr').controller('LoginController', 
	function ($http, $scope) {
	    
	    $scope.login = function(){
	        $http.post('/login', {'username': $scope.username, 'password': $scope.senha}).then( 
	        function (usuario){
	        	alert(JSON.stringify(usuario));
	        },
	        function (error){
	        	alert(JSON.stringify(error));
	        });
	    }

});