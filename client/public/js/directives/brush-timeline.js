//Example: http://bl.ocks.org/mbostock/1667367

angular.module('ifcPoc',[])
  .directive('brushTimeline', function($window){
    console.log("in test directive!")
    return {
      restrict: 'E',
      template: "<p> BRUSH TIMELINE TEST TEXT <p>",
      link: function(scope){
        console.log("ON SCOPE" + scope[0]);
        console.log("IN LINK FUNCTION");
      }
    }
  })