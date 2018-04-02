portal.controller("EditCompanyController", function($scope, $rootScope, $http, $uibModalInstance, companies, company, Notification, GlobalSpinner){
	
	$scope.company = company;
	$scope.companies = companies;
	
	$scope.stateCodes = $rootScope.stateCodes;
	$scope.statuses = $rootScope.statuses;
	
	
	$scope.close = function(){
		$uibModalInstance.dismiss('cancel');
	};
	
	$scope.saveCompany = function(){
		GlobalSpinner.show();
		$http({
			method: "POST",
			url: "/company/update",
			data: JSON.parse(JSON.stringify($scope.company)),
			headers: {"Content-Type": "application/json; charset=utf8"}
		}).then(function success(response){
			GlobalSpinner.hide();
			$uibModalInstance.close("success");
		}, function error(response){
			Notification.error(response.data.message);
			GlobalSpinner.hide();
			$uibModalInstance.dismiss("fail");
		});
	};
	
	$scope.onCompanyTypeaheadSelect = function(item, model, label){
		$uibModalInstance.dismiss(label + " already exists!");
	}
	
});