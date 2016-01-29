//ANGULAR APP

angular.module('ifcPoc', [])
  .controller('mainController', ["$scope", "$http", function($scope, $http) {

    function bindIndabaData(res){
      res.forEach(function(survey_entry){
        
      });
    }

    //Get agg data
    $http.get('/api/v1/doingbusiness/agg')
      .success(function(ifc_data) {
        $scope.ifcData = ifc_data;
        console.log($scope.ifcData);

        $http.get("world110-m3.json")
          .success(function(geo_data){
            $scope.geoData = geo_data;
            console.log($scope.geoData); 
          })
          .error(function(err){
            console.log(err);
          });
      })
      .error(function(err) {
        console.log(err);
      });
    //Hard-coded data for dropdown testing

    $scope.continents = [
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

    $scope.topics = [
      {
        "name":"Algeria",
        "isoa2":"AZ"
      }, 
      {
        "name":"Afghanistan",
        "isoa2":"AF"
      }, 
    ];

    $scope.subtopics = [
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

    $scope.questions = [
      {
        "qid":"1234",
        "text":"question1"
      },
      {
        "qid":"5678",
        "text":"question2"
      }
    ];
  }]);


