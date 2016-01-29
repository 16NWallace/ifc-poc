'use strict';
//Parallel coordinates with brushable axes: http://bl.ocks.org/jasondavies/1341281

angular.module('ifcPoc')
  .directive('parallelCoordinates', function($window){
    return {
      restrict: 'EA',
      templateUrl: "../views/parallel-coords.html", 
      link: function drawParallelCoordinates(scope, element, attrs){
        var margin = {top: 30, right: 10, bottom: 10, left: 10},
          width = 960 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom;

        var x = d3.scale.ordinal().rangePoints([0, width], 1),
            y = {},
            dragging = {};

        var line = d3.svg.line(),
            axis = d3.svg.axis().orient("left"),
            background,
            foreground;

        var svg = d3.select("body").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var plotData = scope.parCoordsData;

      }
    }
  });