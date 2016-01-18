'use strict';

//see DRE timeline directive
//Other setup: http://jsfiddle.net/odiseo/ZnkN6/?utm_source=website&utm_medium=embed&utm_campaign=ZnkN6
angular.module('ifc-poc', [])
  //figure out services/params needed
  .directive('vizMap', function($window){
    return {
      restrict: 'EA',
      template: "<svg style='width:100%;'></svg>",
      //scope: {data: '=mapData'},
      //d3 code for map here
      link: function makeMapD3Plus(scope, element, attrs){
        var visualization = d3plus.viz()
          .container("#vizMap")        // container DIV to hold the visualization
          .data(scope.data.agg)        // data to use with the visualization
          .coords("../../world110-m2.json") // pass topojson coordinates
          .type("geo_map")          // visualization type
          .id("isoa2")            // key for which our data is unique on
          .text("country")             // key to use for display text
          .color("dtf")           // key for coloring countries
          .tooltip(["country", "rank","value"])         // keys to place in tooltip
          .draw()                   // finally, draw the visualization!
      },
      link function makeMapD3Manual(scope, element, attrs){
        //http://www.sitepoint.com/creating-charting-directives-using-angularjs-d3-js/
        var ifcData = scope[attrs.mapData];
        var pathClass = "path";
        var rawSvg = elem.find("svg")[0];
        var svg = d3.select(rawSvg);

        var width = 960,
          height = 500;

        svg.attr("width", width)
          .attr("height", height); 

        d3.json("world110-m2.json", function(err, world){
          if(err){
            console.log(err);
          }
          var topoCountries = topojson.feature(world, world.objects.countries).features;
          var countries = topoCountries.map(function(d){
            var name = d.properties.name;
          });
          svg.append("g")
            .attr("class", "countries")
          .selectAll("path")
            .data(countries)
          .enter().append("path")
            .style("fill", function(d){ return color(d.properties.)})

        });
      }
    }
  });

function convertArrayIsoMap(jsonArray, callback){
  for(var i=0;i<jsonArray.length;i++){

  }
}