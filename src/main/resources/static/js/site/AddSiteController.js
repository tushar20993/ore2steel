portal.controller("AddSiteController", function($scope, $rootScope, $http, $uibModalInstance, sites, Notification, GlobalSpinner){
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
		GlobalSpinner.show();
		$http.post("/site/save", $scope.site).then(
				function success(response){
					GlobalSpinner.hide();
					$uibModalInstance.close("success");
				}, function error(response){
					GlobalSpinner.hide();
					$uibModalInstance.dismiss("fail");
				});
	}
	
});