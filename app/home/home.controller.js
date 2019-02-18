(function (){
    angular.module('app').controller('HomeController', homeController);

    homeController.$inject = ['$http'];
    function homeController($http) {
        
        var vm = this;

        vm.message = '';
        vm.getMessage = function(){
          $http.get('http://localhost:8080/authorized')
          .then(function(response){
              vm.message = response.data.message;
          }, function(err){
              console.log(err);
          })
        }
    }
})();