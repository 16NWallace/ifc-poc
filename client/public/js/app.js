//ANGULAR APP
angular.module('ifc-poc', [])

.controller('mainController', ["$scope", function($scope, $http) {

    //Get all data
    // $http.get('/api/v1/doingbusiness')
    //     .success(function(data) {
    //         $scope.ifcData = data;
    //         console.log(data);
    //     })
    //     .error(function(error) {
    //         console.log('Error: ' + error);
    //     });

    $scope.ifcData = [
        {"country":"Zimbabwe","isoa2":"ZW","continent":"AF","year":"2016","rank":"184","dtf":"31.67"},
        {"country":"Algeria","isoa2":"DZ","continent":"AF","year":"2016","rank":"120","dtf":"20"},
        {"country":"Ukraine", "isoa2":"UA", "continent":"EU", "year":"2016","rank":"35","dtf":"13.2"}
        ]

    $scope.visualization = d3plus.viz()
          .container("#vizMap")        
          .data($scope.ifcData)        
          .coords("world110-m2.json") 
          .type("geo_map")          
          .id("isoa2")            
          .text("country")             
          .color("dtf")           
          .tooltip(["country", "rank","value"])         
          .draw()     
});
