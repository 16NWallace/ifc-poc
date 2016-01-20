//Parallel coordinates with brushable axes: http://bl.ocks.org/jasondavies/1341281

angular.module('ifc-poc', [])
  .directive('parallelCoordinates', function($window){
    return {
      restrict: 'EA',
      replace: false,
      template: "<svg width='850' height='200'></svg>", //TODO: make reactive, not finite
      scope: {ifcData: '=', dims: '='}, //dims is which DBI ranks to include
      link: function drawParallelCoordinates(scope, element, attrs){
        var axes = scope.dims; //[gettingCredit, tradingAcrossBorders, etc]

        //IMPLEMENT LATER
      }
    }
  });