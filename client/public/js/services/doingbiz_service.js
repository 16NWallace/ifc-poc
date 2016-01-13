angular.module('db-service', [])
  .factory('Data', ['$http', function($http){
    return {
      get: function() {
        return $http.get('/api/v1/doingbusiness');
      }
    }
  }]