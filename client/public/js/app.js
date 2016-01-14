//ANGULAR APP
angular.module('ifc-poc', [])

.controller('mainController', function($scope, $http) {

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
        ]

    $scope.visualization = d3plus.viz()
          .container(element)        
          .data($scope.ifcData)        
          .coords("../../world110-m2.json") 
          .type("geo_map")          
          .id("isoa2")            
          .text("country")             
          .color("dtf")           
          .tooltip(["country", "rank","value"])         
          .draw()     
});
