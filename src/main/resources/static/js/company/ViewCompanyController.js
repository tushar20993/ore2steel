portal.controller("CompanyController", function($scope, $rootScope, $http, $uibModal, $window){
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
							rowHeight: 40,
							enableSorting: true,
							data: $scope.companies,
							columnDefs: [
								{name: "companyId", 			visible: true, },
								{name: "companyName", 			visible: true, cellTemplate: '<div class="ui-grid-cell-contents wrap no-overflow" white-space: normal>{{row.entity.companyName}}</div>'},
								{name: "companyAddress", 		visible: true, },
								{name: "stateCode", 			visible: true, cellTemplate: '<div class="ui-grid-cell-contents wrap no-overflow" white-space: normal>{{row.entity.stateCode.stateName}}</div>', displayName: "State", field: "stateCode.stateName"},
								{name: "pinCode", 				visible: true, displayName: "PIN Code"},
								{name: "gstNumber", 			visible: true, displayName: "GSTIN"},
								{name: "registrationStatus", 	visible: false, displayName: "GST Type"},
								{name: "contactPerson", 		visible: true, },
								{name: "contactNumber", 		visible: true, },
								{name: "Actions", 
									cellTemplate: 
										'<div class="ui-grid-cell-contents row">' + 

										'<button type = "button" class = "btn btn-sm btn-info col-md-4 offset-md-1" ' + 
											'ng-click = "grid.appScope.editCompany(row.entity)" >' + 
													'<span class="material-icons">mode_edit</span>'+ 
										'</button>' +
										
										'<button type = "button" class = "btn btn-sm btn-danger col-md-4 offset-md-1" ' + 
													'ng-click = "grid.appScope.deleteCompany(row.entity)" >' + 
													'<span class="material-icons">delete</span>'+ 
										'</button>' + 
											
											
										'</div>',
									enableSorting : false, 
									enableFiltering: false, 
									resizable: false},
							]
						};
				},
				function(response){
					console.log("ERROR", response);
				});		
	};
	
	$scope.getCompanies();
	
	$scope.deleteCompany = function(company){
		var confirm = $window.confirm("Are you sure you want to delete " + company.companyName + "?");
		$http({
			method: "POST",
			url: "/company/delete",
			data: JSON.parse(JSON.stringify(company)),
			headers: {"Content-Type": "application/json; charset=utf8"}
		}).then(function success(response){
			$scope.getCompanies();
			$rootScope.addAlert("Successfully deleted company", "success");
		}, function error(response){
			$rootScope.addAlert("Failed to delete company", "danger");
		});
	}
	
	$scope.editCompany = function(company){
		var modalInstance = $uibModal.open({
			animation: true,
			templateUrl: "partials/company/editCompany.html",
			backdrop: "static",
			keyboard: false,
			size: "lg",
			controller: "EditCompanyController",
			resolve: {
				companies: function(){
					return $scope.companies;
				},
				company: function(){
					return JSON.parse(JSON.stringify(company));
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
	
	$scope.addCompany = function(){
		var modalInstance = $uibModal.open({
			animation: true,
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