'use strict';


//see DRE timeline directive
angular.module('ifc-poc')
  .directive('d3VizMap', function($window,$location, $anchorScroll, $timeout, d3service){
    return {
      restrict: 'EA',
      template: "<svg style='width:100%;'></svg>",
    }
  })