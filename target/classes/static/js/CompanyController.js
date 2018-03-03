portal.controller("CompanyController", function($scope, $http, $uibModal){
	console.log("Company Controller");
	$scope.message = "Company Controller Working!";
	$scope.companies = {};
	$scope.addCompany = function(){
		var modalInstance = $uibModal.open({
			animation: false,
			templateUrl: "partials/company/addCompany.html",
			backdrop: true,
			controller: "AddCompanyController",
			resolve: {
				companies: function(){
					return $scope.companies;
				}
			}
		});
	};
	
});


portal.controller("AddCompanyController", function($scope, $rootScope, $http, $uibModalInstance, companies){
	$scope.companies = companies;
	$uibModalInstance.result.then(function(){
		alert(1);
	}, function(){alert(2)});
});