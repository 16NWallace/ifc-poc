'use strict';

//see DRE timeline directive
//Other setup: http://jsfiddle.net/odiseo/ZnkN6/?utm_source=website&utm_medium=embed&utm_campaign=ZnkN6
angular.module('ifcPoc')
  //figure out services/params needed
  .directive('vizMap', function($window){
    console.log("in directive");
    return {
      restrict: 'E',
      scope: {ifcData:'=', geoData:'='},
      //scope: false,
      //d3 code for map here
      template: "<svg style='width:100%;'></svg>",
      link: function postLink(scope, element, attrs){
        //var d3 = $window.d3;
        console.log("IN LINK FUNCTION");
        console.log(Object.keys(scope));
        
        var ifcData = [];
        var geoData = [];

        function renderMap(){
          var d3selectContainer = d3.select(element[0]);

          try{
            d3plus.viz()
              .container(d3selectContainer)     
              .data(scope.ifcData.agg)        
              .coords(scope.geoData) 
              .type("geo_map") 
              .legend({"value": true})        
              .id("isoa2")
               //hack to get around improperly sized names                
              .text({"value":"country"})      
              .color({"heatmap":["red","blue"],"value":"rank"})          
              .tooltip(["country", "rank","dtf"])        
              .draw(); 
          } catch (e) {
            console.log(e);
          }
  
        }
        
        scope.$watchGroup(['ifcData','geoData'], function(newVals, oldVals){
          scope.ifcData = newVals[0];
          scope.geoData = newVals[1];
          renderMap();
        });     
      }
    }
  });