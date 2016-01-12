//ANGULAR APP
angular.module('ifc-poc', [])

.controller('mainController', function($scope, $http) {

    $scope.ifcData = {};

    Get all data
    $http.get('/api/v1/doingbusiness')
        .success(function(data) {
            $scope.ifcData = data;
            console.log(data);
        })
        .error(function(error) {
            console.log('Error: ' + error);
        });
});
