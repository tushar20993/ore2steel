portal.controller("AddSiteController", function($scope, $rootScope, $http, $uibModalInstance, sites, Notification){
	$scope.site = {};
	$scope.sites = sites;
	$scope.statuses = [];
	
	$http.get("/company/getAll").then(
			function success(response){
				$scope.companies = response.data;
			}, function fail(response){
				Notification.error("Failed to fetch companies");
			});
	
	$scope.stateCodes =  JSON.parse(JSON.stringify($rootScope.stateCodes));
	$scope.statuses = JSON.parse(JSON.stringify($rootScope.statuses));	
	$scope.close = function(){
		$uibModalInstance.dismiss('cancel');
	};
	
	$scope.saveSite = function(){
		$http({
			method: "POST",
			url: "/site/save",
			data: JSON.parse(JSON.stringify($scope.site)),
			headers: {"Content-Type": "application/json; charset=utf8"}
		}).then(function success(response){
			$uibModalInstance.close("success");
		}, function error(response){
			$uibModalInstance.dismiss("fail");
		});
	}
	
});