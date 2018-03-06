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
				$rootScope.addAlert(data.msg, data.type);
			}
		});
	};
	
	
	
});


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
		console.log($scope.company);
		
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