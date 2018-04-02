portal.controller("AddSiteController", function($scope, $rootScope, $http, $uibModalInstance, sites, Notification, GlobalSpinner){
	$scope.site = {};
	$scope.oldSites = [];
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
	
	$scope.onCompanySelect = function(company){
		GlobalSpinner.show();
		var company = $scope.site.siteId.company;
		if(company == undefined){
			$scope.oldSites = [];
			GlobalSpinner.hide();
			return;
		}
		$http.get("/site/get?id=" + company.companyId).then(
				function success(response){
					$scope.oldSites = response.data;
					GlobalSpinner.hide();				
				},
				function fail(response){
					GlobalSpinner.hide();
					Notification.error("Error in getting sites for " + company.companyName);
				});
	};
	
	$scope.onSiteTypeaheadSelect = function(item, model, label){
		Notification.error(label + " already exists!");
		$scope.site.siteName = "";
	}
	
	$scope.saveSite = function(){
		GlobalSpinner.show();
		$http.post("/site/save", $scope.site).then(
				function success(response){
					GlobalSpinner.hide();
					$uibModalInstance.close("success");
				}, function error(response){
					GlobalSpinner.hide();
					Notification.error(response.data.message);
					$uibModalInstance.dismiss("fail");
				});
	}
	
});