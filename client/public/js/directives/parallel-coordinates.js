//Parallel coordinates with brushable axes: http://bl.ocks.org/jasondavies/1341281

angular.module('ifc-poc')
  .directive('parallelCoordinates', function($window){
    return {
      restrict: 'EA',
      templateUrl: "/views/brush-timeline.html", 
      link: function drawParallelCoordinates(scope, element, attrs){
        
      }
    }
  });