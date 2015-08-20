// stats controller js here
(function() {

  var app = angular.module('Stats',[]);

  app.controller('StatsController', ['$scope', function($scope) {
    //nothing for now. Will add later.
    $scope.d3values = [1,2,3,4,5,6,7,8];
    $scope.d3values.push(8);
  }]);

  app.directive('dthree', function(){
  var width = 300;
  var height = 300;
  var color = 'purple';
  
  return {
    restrict: 'EA',

    scope: 

    link: function (scope, element, attrs) {
        console.log(element);
        var graph = d3.select(element[0]);
        
        var updateGraph = function(newValue){
          graph.selectAll('*').remove();
          var svg = graph.append('svg')
              .attr('width', width)
              .attr('height', height);
            
          svg.append("rect")
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("fill", "purple");

          svg.selectAll('p').data(scope.d3values)
            .enter().append('rect')
            .attr('fill', 'yellow')
            .attr('width', '10px')
            .attr('height', '10px');
        };    
        
        scope.$watch('d3values', function (newVal, oldVal) {
          updateGraph(scope.d3values);
          console.log('hello');
        });
    }
  };
});
})();
