//ANGULAR APP
angular.module('ifc-poc', [])

.controller('mainController', function($scope, $http) {

    $scope.formData = {};
    $scope.ifcData = {};

    // Get all todos
    $http.get('/api/v1/todos')
        .success(function(data) {
            $scope.ifcData = data;
            console.log(data);
        })
        .error(function(error) {
            console.log('Error: ' + error);
        });
});
