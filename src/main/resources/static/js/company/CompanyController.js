portal.controller("CompanyController", function($scope, $rootScope, $http, $uibModal){
	console.log("Company Controller");
	
	
	
	$scope.alerts = [];
	$scope.getCompanies = function(){
		$http.get("/company/getAll").then(
				function(response){
					$scope.companies = response.data;
					$scope.gridOptions = {
							exporterMenuCsv: true,
							enableGridMenu: true,
							enableFiltering : true,
							enableColumnResizing: true,
							enableRowReordering: true,
							data: $scope.companies,
							enableSorting: true,
							data: $scope.companies,
							columnDefs: [
								{name: "companyName", 			visible: true, cellTemplate: '<div class="ui-grid-cell-contents wrap no-overflow" white-space: normal>{{row.entity.companyName}}</div>'},
								{name: "companyAddress", 		visible: false, },
								{name: "stateCode", 			visible: true, cellTemplate: '<div class="ui-grid-cell-contents wrap no-overflow" white-space: normal>{{row.entity.stateCode.stateName}}</div>', displayName: "State", field: "stateCode.stateName"},
								{name: "pinCode", 				visible: true, displayName: "PIN Code"},
								{name: "registrationStatus", 	visible: true, },
								{name: "gstNumber", 			visible: true, displayName: "GSTIN"},
								{name: "contactPerson", 		visible: true, },
								{name: "contactNumber", 		visible: true, },
							]
						};
				},
				function(response){
					console.log("ERROR", response);
				});		
	};
	
	$scope.getCompanies();
	
	
	
	$scope.addCompany = function(){
		var modalInstance = $uibModal.open({
			animation: false,
			templateUrl: "partials/company/addCompany.html",
			backdrop: "static",
			keyboard: false,
			size: "lg",
			controller: "AddCompanyController",
			resolve: {
				companies: function(){
					return $scope.companies;
				}
			}
		});
		
		modalInstance.result.then(function(data){
			if(data.status == 1){
				$scope.getCompanies();
				$rootScope.addAlert(data.msg, "success");
			}
			else if(data.status == 0){
				$rootScope.addAlert(data.msg, "danger");
			}
			else{
				$rootScope.addAlert(data.msg, "info");
			}
		});
	};
	
	
	
});