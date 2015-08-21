// stats controller js here
(function() {

  var app = angular.module('Stats',[]);

  app.controller('StatsController', ['$scope', '$location','$stateParams','$state', function($scope, $location, $stateParams, $state) {
    //nothing for now. Will add later.
    $scope.d3values = $stateParams.d3values
    console.log()

    $scope.goToGlobal = function(){
      $scope.d3values = getGlobalStats()
      $state.go('stats.global');
    }

    $scope.goToPersonal = function(){
      $scope.d3values = getPersonalStats()
      $state.go('stats.personal'); 
    }
    // replace with a real function
    var getGlobalStats = function(){
      return [20,30,40];
    }

    var getPersonalStats = function(){
      return [1,2,3,4,5];
    }
    
  }]);
})();
