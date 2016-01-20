'use strict';

//see DRE timeline directive
//Other setup: http://jsfiddle.net/odiseo/ZnkN6/?utm_source=website&utm_medium=embed&utm_campaign=ZnkN6
angular.module('ifcPoc', [])
  //figure out services/params needed
  .directive('vizMap', function($window){
    console.log("in directive");
    return {
      restrict: 'E',
      scope: {ifcData: '=', geoData:'='},
      //scope: false,
      //d3 code for map here
      template: '<div>id="chart"</div>',
      link: function postLink(scope, element, attrs){
        //var d3 = $window.d3;

        console.log("IN LINK FUNCTION");
        var ifcData = scope.ifcData.agg;
        console.log("ifcData");
        var geoData = scope.geoData;
        console.log("geoData");
        d3plus.viz()
          .container(element[0])    //.container ("#chart")    
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