      link: function makeMap(scope, element, attrs){
         //Color heatmap by overall DBI ranking 
        var color = d3.scale.log()
          .range(["hsl(62,100%,90%)", "hsl(228,30%,20%)"])
          .interpolate(d3.interpolateHcl);

        var bizData = scope.data.agg;
        var dtfVals = bizData.forEach(function(row){ return row.dtf });
        color.domain([d3.quantile(dtfVals, .01), d3.quantile(dtfVals, .99)]);

        //DOM element where graph goes
        //var d3 = $window.d3 ;//use d3 service --> has d3 tip integrated (TODO: finish this dependency chain, add assets/d3-tip)
        var width = 960,
            height = 500; //TODO:auto-resizing service

        var worldProjection = d3.geo.mercator()
          .scale(900);

        var path = d3.path.geo().projection(worldProjection);
        
        var svg = d3.select(element[0]).append("svg")
          .attr("width", width)
          .attr("height", height);

        svg.append("rect")
          .attr("class", "background") //TODO: css .background class - set color etc
          .attr("width", width)
          .attr("height", height);

        d3.json("../../world110-m2.json", function(err, world){
            if(err){
              console.log(err);
            }
            var topoCountries = topojson.feature(world, world.objects.countries).features;
            var countries = topoCountries.map(function(d){d.properties.dtf = bizData.});
            svg.append("g")
              .attr("class", "countries")
            .selectAll("path")
              .data(countries)
            .enter().append("path")
              .style("fill", function(d){ return color(d.properties.)})

        });
      }