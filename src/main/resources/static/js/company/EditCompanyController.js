portal.controller("EditCompanyController", function($scope, $rootScope, $http, $uibModalInstance, companies, company){
	
	$scope.company = company;
	$scope.companies = companies;
	
	$scope.stateCodes = $rootScope.stateCodes;
	
	$scope.statuses = [];
	$http.get("/status/getAll").then(
			function(response){
				$scope.statuses = response.data;
			},
			function(response){
				console.error(response.data);
			});
	
	
	$scope.close = function(){
		$uibModalInstance.dismiss('cancel');
	};
	
	$scope.saveCompany = function(){
		$http({
			method: "POST",
			url: "/company/update",
			data: JSON.parse(JSON.stringify($scope.company)),
			headers: {"Content-Type": "application/json; charset=utf8"}
		}).then(function success(response){
			$uibModalInstance.close("success");
		}, function error(response){
			$uibModalInstance.dismiss("fail");
		});
	};
	
	$scope.onCompanyTypeaheadSelect = function(item, model, label){
		$uibModalInstance.dismiss(label + " already exists!");
	}
	
});