'use strict';

//see DRE timeline directive
//Other setup: http://jsfiddle.net/odiseo/ZnkN6/?utm_source=website&utm_medium=embed&utm_campaign=ZnkN6
angular.module('ifcPoc')
  //figure out services/params needed
  .directive('vizMap', function ($window, $http){
    return {
      restrict: 'EA',
      templateUrl: "views/mapViz.html",
      link: function postLink(scope, element, attrs){
            //Get agg data
    var request = $http.get('/api/v1/doingbusiness/agg')
      .success(function(ifc_data) {
        scope.vizData = ifc_data.agg;
        console.log(scope.vizData);

        $http.get("world110-m3.json")
          .success(function(geo_data){
            scope.geoData = geo_data;
            console.log(scope.geoData); 
          })
          .error(function(err){
            console.log(err);
          });

        var countrySet = new Set(); //account for same country/multi-year duplicates
        var countryNames = [];
        scope.vizData.forEach(function (row, index) {
          if(countryNames.indexOf(row.country)<0){
            countryNames.push(row.country);
            countrySet.add({
              'name': row.country,
              'isoa2': row.isoa2,
              'continent': row.continent
            });
          }
        });
        scope.topics = [...countrySet];
        return scope.vizData;
      })
      .error(function(err) {
        console.log(err);
      });
    //Hard-coded data for dropdown testing

    //scope.requestPromise = { promise: request };

    scope.continents = [
         {
        "name":"Africa",
        "isoa2":"AF"
      },
      {
        "name":"Europe",
        "isoa2":"EU"
      },
      {
        "name":"North America",
        "isoa2":"NA"
      },
      {
        "name":"Asia",
        "isoa2":"AS",
      },
      {
        "name":"South America",
        "isoa2":"SA"
      },
      {
        "name":"Australia",
        "isoa2":"AU"
      },
      {
        "name":"Antartica",
        "isoa2":"AQ"
      }
    ]

    scope.incomeLevels = [
      {
        name: "Low-income",
        countries: ["AF","AG", "BR"]
      },
      {
        name:"High-income",
        countries: ["US","FR","DE"]
      }
    ]

    scope.subtopics = [
      {
        "id":"3333",
        "name":"Income"
      },
      {
        "id":"424",
        "name":"Region"
      },
      {
        "id":"111",
        "name":"Continent"
      }
    ];

    scope.questions = [
      {
        "qid":"1234",
        "text":"question1"
      },
      {
        "qid":"5678",
        "text":"question2"
      }
    ];

        //Same digest cycle workflow as DRE
        var plotData = [];
        var geoData = [];
        var filterParams = {};

        //D3Plus mute/solo to select certain data points
        var soloData = [];
        var muteData = ["AM"];

        function applyFilters(data, callback){
          //Handles case when data has not been narrowed, only variable changed
          if(scope.filterParams.$pristine){
            console.log("in if");
            callback(scope.vizData);
          } else {
            console.log("in else");
            var filteredVizData =[];
            scope.vizData.forEach(function(row){
              if(scope.filterParams.topicSelected){
                scope.filterParams.topicSelected.forEach(function(topic){
                  if(topic.isoa2==row.isoa2){
                    filteredVizData.push(row);
                  }
                });
              }
              if(scope.filterParams.subtopicSelected){
                var subtopicObj = scope.filterParams.subtopicSelected;
                if(subtopicObj.name==="Continent"){
                  console.log("in continent block");
                  if(row.continent==subtopicObj.continent.isoa2){
                    console.log("in if", row.country);
                      filteredVizData.push(row);
                    }
                } else { //Region or Income - fields that have name/countries grouping
                  if(subtopicObj.category.countries.indexOf(row.isoa2)>-1){
                    filteredVizData.push(row);
                  }
                }
              }
            });
            console.log(filteredVizData); 
            callback(filteredVizData);
          }
        }

        function renderMap(plotData){
          var d3selectContainer = d3.select(element.find("#mapViz")[0]);
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
              //.legend({"value": true})        
              .id("isoa2")     //https://github.com/alexandersimoes/d3plus/wiki/Data-Filtering#mute        
              .text({"value":"country"})
              //.time({"value":"year", "solo":2016}) 
              .timeline(true)     
              .color("rank")          
              .tooltip(["country", "rank","dtf"])        
              .draw(); 
          } catch (e) {
            console.log(e);
          }
  
        }

        scope.drawMap = function(){ 
          applyFilters(scope.vizData, function (result){
            renderMap(result);
          });
        };

        //If either vizData or geoData is updated - both needed for viz, geoData only loaded once
        scope.$watchGroup(['vizData','geoData'], function(newVals, oldVals){
          if(newVals!==oldVals){
            plotData = newVals[0]; //put values in local variable
            geoData = newVals[1];
            scope.drawMap();
          }
        }); 

        scope.$watch('filterParams', function(newVal, oldVal){
          filterParams = newVal;
          scope.drawMap();
        });    
      }
    }
  });