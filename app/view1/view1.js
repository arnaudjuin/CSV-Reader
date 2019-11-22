'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl' , function($scope,$http) {
      // split content ased on new line


      $scope.readCSV = function() {
// http get request to read CSV file content
console.log($http.get('../assets/table.csv'))
$http.get('../assets/table.csv').then($scope.processData);
};

$scope.processData = function(allText) {
		// split content based on new line
		var allTextLines = allText.data.split(/\r\n|\n/);
     allTextLines[0]  = allTextLines[0] +'';
		var headers = allTextLines[0].split(';');
    console.log(headers)
    var lines = [];


		for ( var i = 0; i < allTextLines.length; i++) {
			// split content based on comma
      var data = data + '';
			var data = allTextLines[i].split(';');
			if (data.length == headers.length) {
				var tarr = [];
				for ( var j = 0; j < headers.length; j++) {
					tarr.push(data[j]);
				}
				lines.push(tarr);
			}
		}
		$scope.data = lines;
	};
});
