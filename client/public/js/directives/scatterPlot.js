//TODO: add animation for time points, join population/GDP/basic info table to scope

angular.module('ifc-poc', [])
  //figure out services/params needed
  .directive('scatterPlot', function($window){
    return {
      restrict: 'EA',
      replace: false,
      template: "<svg width='850' height='200'></svg>",
      link: function drawScatterPlot(scope, element, attrs){
        d3plus.viz()
          .container(element.find("svg")[0])        
          .data(ifcData)        
          .coords(geoData) 
          .type("scatter") 
          .legend({"value": true}) 
          .size("population")      
          .id("isoa2")          
          .text("country")             
          .color({"value":"continent"})          
          .tooltip(["country", "population"])  //TODO: make table in pg with basic data (pop'l, GDP, etc.)      
          .draw()  
      }
    }
  });