portal.controller("EditSiteController", function($scope, $rootScope, $http, $uibModalInstance, site){
	$scope.site = site;
	$scope.statuses = [];
	console.log(site);
	
	$scope.stateCodes = [];
	$http.get("/state_code/getAll").then(
			function(response){
				$scope.stateCodes = response.data;
			},
			function(response){
				console.log(response.data.message);
			});
	
	
	
	$http.get("/status/getAll").then(
			function(response){
				$scope.statuses = response.data;
			},
			function(response){
				console.log(response.data.message);
			});

	
	$scope.close = function(){
		$uibModalInstance.close({status: 2, msg: "You closed the window"});
	};
	
	$scope.saveSite = function(){
		var site = JSON.parse(JSON.stringify($scope.site));
		$http({
			method: "POST",
			url: "/site/update",
			data: $scope.site,
			headers: {"Content-Type": "application/json; charset=utf8"}
		}).then(function success(response){
			console.log("Successfully responded");
			$uibModalInstance.close({status: 1, msg: "Successfully saved site!"});
		}, function error(response){
			$uibModalInstance.close({status: 0, msg: "Failed to save site!"});
		});
	}
	
});