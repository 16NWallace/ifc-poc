'use strict';

//see DRE timeline directive
//Other setup: http://jsfiddle.net/odiseo/ZnkN6/?utm_source=website&utm_medium=embed&utm_campaign=ZnkN6
angular.module('ifc-poc', [])
  //figure out services/params needed
  .directive('vizMap', function($window){
    return {
      restrict: 'EA',
      replace: false,
      template: "<svg width='850' height='200'></svg>",
      scope: {ifcData: '@', geoData:'@'},
      //scope: false,
      //d3 code for map here
      link: function(scope, element, attrs){
        var ifcData = scope.ifcData.agg;
        console.log("ifcData");
        var geoData = scope.geoData;
        console.log("geoData");
        d3plus.viz()
          .container(element.find("svg")[0])        
          .data(ifcData)        
          .coords(geoData) 
          .type("geo_map") 
          .legend({"value": true})        
          .id("isoa2")          
          .text("country")             
          .color({"heatmap":["red","blue"],"value":"rank"})          
          .tooltip(["country", "rank","dtf"])        
          .draw()                 
      }
    }
  });