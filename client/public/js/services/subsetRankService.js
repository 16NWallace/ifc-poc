'use strict';

angular.module('ifc-poc', [])
  //$scope vs rootscope?
  .factory('subsetRankService', ['$scope',
    function($scope, field, value){ //TODO: figure out how to pass these params
      //var category = $scope.rankCategory; //continent, year, income level, etc.
      //var sortVal = $scope.rankParamCategory;
      extractData($scope.ifcData, field, value, function(dataArray){
        dataArray.sort(function(a,b){
          return b.rank - a.rank;
        });
        dataArray.forEach(function(row){
          var rankLabel = field + " rank";
          row[rankLabel] = dataArray.indexOf(row);
        });
      });
  }])
}]);

var extractData = function(jsonArray, field, value, callback){
  var yearArray = [];
  for(var i=0; i<=jsonArray.length; i++){
    var row = jsonArray[i];
    if(row[field]!=value){
      continue
    }
    else{
      yearArray.push(row);
    }
  }
  callback(yearArray);
}