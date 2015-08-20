angular.module('app.d3', [])
.directive('dthree', function(){
  var width = 300;
  var height = 300;
  var color = 'purple';

  return {
    restrict: 'E',

    scope: false,

    link: function (scope, element, attrs) {
      var graph = d3.select(element[0]);
      
      var updateGraph = function(){
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
        updateGraph();
      });
    }
  };
});