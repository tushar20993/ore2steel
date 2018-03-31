portal.controller("AddCompanyController", function($scope, $rootScope, $http, $uibModalInstance, companies, GlobalSpinner){
	$scope.company = {};
	$scope.companies = companies;
	
	$scope.stateCodes =  JSON.parse(JSON.stringify($rootScope.stateCodes));
	$scope.statuses = JSON.parse(JSON.stringify($rootScope.statuses));	
	$scope.close = function(){
		$uibModalInstance.dismiss('cancel');
	};
	
	$scope.saveCompany = function(){
		GlobalSpinner.show();
		$http({
			method: "POST",
			url: "/company/save",
			data: JSON.parse(JSON.stringify($scope.company)),
			headers: {"Content-Type": "application/json; charset=utf8"}
		}).then(function success(response){
			GlobalSpinner.hide();
			$uibModalInstance.close("success");
		}, function error(response){
			GlobalSpinner.hide();
			$uibModalInstance.dismiss("fail");
		});
	};
	
	$scope.onCompanyTypeaheadSelect = function(item, model, label){
		$uibModalInstance.dismiss(label + " already exists!");
	}
	
});