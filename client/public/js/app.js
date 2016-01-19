//ANGULAR APP
angular.module('ifc-poc', [])

.controller('mainController', ["$scope", "$http", function($scope, $http) {

  //Get agg data
  $http.get('/api/v1/doingbusiness/agg')
      .success(function(data) {
        $scope.ifcData = data;
        console.log(data);
        $http.get("world110-m3.json")
          .success(function(data){
            $scope.geoData = data;
            console.log($scope.geoData);
            d3plus.viz()
              .container("#vizzz")        
              .data($scope.ifcData.agg)        
              .coords($scope.geoData) 
              .type("geo_map")
              .legend({"value": true})       
              .id("isoa2")          
              .text("country")             
              .color({"heatmap":["red","blue"],"value":"rank"})          
              .tooltip(["country", "rank","dtf"])      
              .draw()  
          })
          .error(function(err){
            console.log("ERROR FROM GET");
            console.log('Error', err);
          });
      })
      .error(function(err) {
        console.log(err);
      });
    });

  // $scope.ifcData = [
  //   {"country":"Zimbabwe","isoa2":"ZW","continent":"AF","year":"2016","rank":"184","dtf":"31.67"},
  //   {"country":"Algeria","isoa2":"DZ","continent":"AF","year":"2016","rank":"120","dtf":"20"},
  //   {"country":"Ukraine", "isoa2":"UA", "continent":"EU", "year":"2016","rank":"35","dtf":"13.2"}
  // ];
  //console.log($scope.ifcData);


