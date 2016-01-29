'use strict';

//see DRE timeline directive
//Other setup: http://jsfiddle.net/odiseo/ZnkN6/?utm_source=website&utm_medium=embed&utm_campaign=ZnkN6
angular.module('ifcPoc')
  //figure out services/params needed
  .directive('vizMap', function($window){
    return {
      restrict: 'EA',
      scope: {
        vizData: '=',
        geoData: '='
      }, //try w/o scope
      //d3 code for map here
      templateUrl: "<svg style='width:100%;'></svg>",
      link: function postLink(scope, element, attrs){
        //Same digest cycle workflow as DRE
        var plotData = [];
        var geoData = [];
        var filterParams = {};

        //D3Plus mute/solo to select certain data points
        var soloData = [];
        var muteData = ["AM"];

        function applyFilters(){
          var queryParams = parseQuery(filterParams.mapQuery);
          var allParams = [filterParams.questionSelected, 
                           filterParams.countrySelected].concat(queryParams);
          for(key in Object.keys(filterParams)){
            //Plot data is DBI row or Indaba response
            if(key){
              plotData.forEach(function(response){
                if(response[key]!=filterParams[key]){
                  muteData.push(response["isoa2"]);
                }
              });
            }
          }
        }

        function renderMap(){
          var d3selectContainer = d3.select(element[0]);
          //hide scope undefined error
          try{
            d3plus.viz()
              .container(d3selectContainer)     
              .data(plotData)        
              .coords({
                "value":geoData,
                "center":[10,0]
              }) 
              .type("geo_map") 
              .legend({"value": true})        
              .id("isoa2", {"mute": muteData})     //https://github.com/alexandersimoes/d3plus/wiki/Data-Filtering#mute        
              .text({"value":"country"})
              .time({"value":"year", "solo":2016}) 
              .timeline(true)     
              .color("rank")          
              .tooltip(["country", "rank","dtf"])        
              .draw(); 
          } catch (e) {
            console.log(e);
          }
  
        }
        
        //If either ifcData or geoData is updated - both needed for viz, geoData only loaded once
        scope.$watchGroup(['ifcData','geoData'], function(newVals, oldVals){
          plotData = newVals[0].agg; //put values in local variable
          geoData = newVals[1];
          //applyFilters();
          renderMap();
        }); 

        scope.$watch('filterParams', function(newVal, oldVal){
          filterParams = newVal;
          //applyFilters();
          renderMap();
        });    
      }
    }
  });