portal.controller("AddSiteController", function($scope, $rootScope, $http, $uibModalInstance, sites){
	$scope.site = {};
	$scope.sites = sites;
	$scope.statuses = [];
	
	$http.get("/company/getAll").then(
			function success(response){
				$scope.companies = response.data;
			}, function fail(response){
				alert("error in getting companies");
			});
	
	$scope.stateCodes = [];
	$http.get("/state_code/getAll").then(
			function(response){
				$scope.stateCodes = response.data;
			},
			function(response){
				console.error(response.data);
			});
	
	
	
	$http.get("/status/getAll").then(
			function(response){
				$scope.statuses = response.data;
			},
			function(response){
				console.error(response.data);
			});

	
	$scope.close = function(){
		$uibModalInstance.close({status: 2, msg: "You closed the window"});
	};
	
	$scope.saveSite = function(){
		console.log($scope.site);
		
		$http({
			method: "POST",
			url: "/site/save",
			data: JSON.parse(JSON.stringify($scope.site)),
			headers: {"Content-Type": "application/json; charset=utf8"}
		}).then(function success(response){
			$uibModalInstance.close({status: 1, msg: "Successfully saved site!"});
		}, function error(response){
			$uibModalInstance.close({status: 0, msg: "Failed to save site!"});
		});
	}
	
});