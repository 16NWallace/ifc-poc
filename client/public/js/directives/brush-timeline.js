//Example: http://bl.ocks.org/mbostock/1667367

angular.module('ifcPoc')
  .directive('brushTimeline', function($window){
    return {
      restrict: 'E',
      template: "<svg style='width:50%;'></svg>",
      scope: {
        ifcData:'=',
        countries: '&', 
        questions: '&', 
        filterParams: '&'
      },
      link: function(scope, element, attrs){
        
      }
    }
  });