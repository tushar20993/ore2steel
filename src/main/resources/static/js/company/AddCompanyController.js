portal.controller("AddCompanyController", function($scope, $rootScope, $http, $uibModalInstance, companies){
	
	$scope.company = {};
	$scope.companies = companies;
	
	$scope.stateCodes = [];
	$http.get("/state_code/getAll").then(
			function(response){
				$scope.stateCodes = response.data;
				console.log($scope.stateCodes )
			},
			function(response){
				console.error(response.data);
			});
	
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