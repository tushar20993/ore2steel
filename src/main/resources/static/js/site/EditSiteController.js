portal.controller("EditSiteController", function($scope, $rootScope, $http, $uibModalInstance, site, Notification){
	$scope.site = site;
	$scope.statuses = [];
	$scope.stateCodes = [];
	$http.get("/state_code/getAll").then(
			function(response){
				$scope.stateCodes = response.data;
			},
			function(response){
				Notification.error("Failed to fetch states");
			});
	
	
	
	$http.get("/status/getAll").then(
			function(response){
				$scope.statuses = response.data;
			},
			function(response){
				Notification.error("Failed to fetch registration statuses");
			});

	
	$scope.close = function(){
		$uibModalInstance.dismiss('cancel');
	};
	
	$scope.saveSite = function(){
		var site = JSON.parse(JSON.stringify($scope.site));
		$http({
			method: "POST",
			url: "/site/update",
			data: $scope.site,
			headers: {"Content-Type": "application/json; charset=utf8"}
		}).then(function success(response){
			$uibModalInstance.close("success");
		}, function error(response){
			$uibModalInstance.dismiss("fail");
		});
	}
	
});