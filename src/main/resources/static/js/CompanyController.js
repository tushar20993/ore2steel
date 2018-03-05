portal.controller("CompanyController", function($scope, $http, $uibModal){
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
								{name: "companyAddress", 		visible: true, },
								{name: "companyPan", 			visible: true, },
								{name: "registrationStatus", 	visible: true, },
								{name: "gstNumber", 			visible: true, },
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
			if(data == "success"){
				$scope.getCompanies();
				$scope.alerts.push({msg: "Successfully added", type: data});
			}
			else if(data == "danger"){
				$scope.alerts.push({msg: "Failed to add. Try again later.", type: data});
			}
		});
	};
	
	
	
});


portal.controller("AddCompanyController", function($scope, $rootScope, $http, $uibModalInstance, companies){
	$scope.company = {};
	$scope.companies = companies;
	$scope.statuses = [];
	$http.get("/status/getAll").then(
			function(response){
				$scope.statuses = response.data;
			},
			function(response){
				console.error(response.data);
			});

	
	$scope.close = function(){
		$uibModalInstance.close("close");
	};
	
	$scope.saveCompany = function(){
		console.log($scope.company);
		
		$http({
			method: "POST",
			url: "/company/save",
			data: JSON.parse(JSON.stringify($scope.company)),
			headers: {"Content-Type": "application/json; charset=utf8"}
		}).then(function success(response){
			$uibModalInstance.close("success");
		}, function error(response){
			$uibModalInstance.close("danger");
		});
	}
	
});