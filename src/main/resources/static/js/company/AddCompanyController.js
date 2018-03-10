portal.controller("AddCompanyController", function($scope, $rootScope, $http, $uibModalInstance, companies){
	
	$scope.company = {};
	$scope.companies = companies;
	
	$scope.stateCodes =  JSON.parse(JSON.stringify($rootScope.stateCodes));
	$scope.statuses = JSON.parse(JSON.stringify($rootScope.statuses));	
	$scope.close = function(){
		$uibModalInstance.close({status: 2, msg: "You closed the window"});
	};
	
	$scope.saveCompany = function(){
		$http({
			method: "POST",
			url: "/company/save",
			data: JSON.parse(JSON.stringify($scope.company)),
			headers: {"Content-Type": "application/json; charset=utf8"}
		}).then(function success(response){
			$uibModalInstance.close({status: 1, msg: "Successfully saved company!"});
		}, function error(response){
			$uibModalInstance.close({status: 0, msg: "Failed to save company!"});
		});
	};
	
	$scope.onCompanyTypeaheadSelect = function(item, model, label){
		$uibModalInstance.close({status: 2, msg: label + " already exists!"});
	}
	
});