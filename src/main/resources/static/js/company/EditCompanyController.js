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
		$uibModalInstance.close({status: 2, msg: "You closed the window"});
	};
	
	$scope.saveCompany = function(){
		console.log(JSON.parse(JSON.stringify($scope.company)))
		$http({
			method: "POST",
			url: "/company/update",
			data: JSON.parse(JSON.stringify($scope.company)),
			headers: {"Content-Type": "application/json; charset=utf8"}
		}).then(function success(response){
			$uibModalInstance.close({status: 1, msg: "Successfully updated company!"});
		}, function error(response){
			$uibModalInstance.close({status: 0, msg: "Failed to update company!"});
		});
	};
	
	$scope.onCompanyTypeaheadSelect = function(item, model, label){
		$uibModalInstance.close({status: 2, msg: label + " already exists!"});
	}
	
});