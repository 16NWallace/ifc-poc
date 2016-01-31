# ifc-poc

##Data sources

The world map and parallel coordinates examples use data from the [Doing Business Indicators](http://www.doingbusiness.org/). 

Data was opened in Excel and manually split into separate sheets based on indicator category and converted to csv files, then copied to a local postgres database. The most recent database dump and processed Excel file can be found in [resources](http:github.com/16NWallace/ifc-poc/tree/master/resources).

```COPY doingbusiness_(indicator) FROM '/path/to/csv/(indicator.csv)' WITH FORMAT csv;```

Each table was then joined with ISO country and continent code information for easier front-end data manipulation and mapping (country codes downloaded from Wikipedia ISO page). Some manual data cleaning/coercion forfull/abbreviated country names.

Schema definitions and PostgreSQL processing scripts can be found in [resources/sql](http:github.com/16NWallace/ifc-poc/tree/master/resources/sql).

##Visualizations

###World Choropleth
 
 This heatmap shows the overall Doing Business Rank per country (1-189) over all years available in the Doing Business data. It was generated using [D3Plus](http://d3plus.org).

###Parallel Coordinates

Each axis of this parallel coordinates diagram is the rank of the Doing Business Indicators (a subset were chosen for demo purposes, modify `join_ranks.sql` to include more columns). Data is grouped and colored by continent. This visualization was written in [D3](http://d3js.org/) and based of off [this example](http://bl.ocks.org/jasondavies/1341281).

##Runing the app

Go to root directory and `npm install`. Modify `config.js` file to have location of Postrgres database. Then start the server, which will be serving on `localhost:3000`. Start configurations are set in `package.json` as `node bin/www`. To run:

```npm start```
