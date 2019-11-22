"use strict";

angular
  .module("myApp.view1", ["ngRoute"])

  .config([
    "$routeProvider",
    function($routeProvider) {
      $routeProvider.when("/view1", {
        templateUrl: "view1/view1.html",
        controller: "View1Ctrl"
      });
    }
  ])

  .controller("View1Ctrl", function($scope, $http) {
    // split content ased on new line

    $scope.index = 0;
    $scope.increment = 200;
    $scope.previous_page = false;

    $scope.previousPage = function() {
      $scope.index -= $scope.increment;
      $scope.readCSV();
    };

    $scope.nextPage = function() {
      $scope.index += $scope.increment;

      $scope.readCSV();
    };

    $scope.readCSV = function() {
      // http get request to read CSV file content
      $http.get("../assets/table.csv").then($scope.processData);
    };

    $scope.processData = function(allText) {
      console.log($scope.index);
      // split content based on new line
      var allTextLines = allText.data.split(/\r\n|\n/);
      allTextLines[0] = allTextLines[0] + "";
      var headers = allTextLines[0].split(";");
      var lines = [];
      $scope.result = [];
      $scope.length = allTextLines.length;

      $scope.result.push(headers);
      for (var i = $scope.index; i < $scope.index + $scope.increment; i++) {
        // split content based on comma
        if (i != 0) {
          var data = data + "";
          var data = allTextLines[i].split(";");
          if (data.length == headers.length) {
            var tarr = [];
            for (var j = 0; j < headers.length; j++) {
              tarr.push(data[j]);
            }
            console.log(headers.length);
            $scope.result.push(tarr);
          }
        }
      }
    };
  });
