angular.module('app.d3', [])
.directive('dthree', function(){
  var width = 300;
  var height = 300;
  var color = 'purple';

  console.log('link function', scope.d3values);
  return {
    restrict: 'EA',

    scope: {
      d3values: 
    },

    link: function (scope, element, attrs) {
      scope.
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