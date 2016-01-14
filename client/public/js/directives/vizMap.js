'use strict';

//see DRE timeline directive
//Other setup: http://jsfiddle.net/odiseo/ZnkN6/?utm_source=website&utm_medium=embed&utm_campaign=ZnkN6
angular.module('ifc-poc')
  //figure out services/params needed
  .directive('vizMap', function($window, $location, $anchorScroll, $timeout, d3service){
    return {
      restrict: 'E',
      template: "<svg style='width:100%;'></svg>",
      scope: {data: '=mapData'},
      //d3 code for map here
      link: function makeMapD3Plus(scope, element, attrs){
        var visualization = d3plus.viz()
          .container(element)        // container DIV to hold the visualization
          .data(scope.data.agg)        // data to use with the visualization
          .coords("../../world110-m2.json") // pass topojson coordinates
          .type("geo_map")          // visualization type
          .id("isoa2")            // key for which our data is unique on
          .text("country")             // key to use for display text
          .color("dtf")           // key for coloring countries
          .tooltip(["country", "rank","value"])         // keys to place in tooltip
          .draw()                   // finally, draw the visualization!
      }
    }
  });