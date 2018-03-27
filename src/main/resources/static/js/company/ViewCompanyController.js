portal.controller("CompanyController", function($scope, $rootScope, $http, $uibModal, $window, Notification, GlobalSpinner){
	GlobalSpinner.hide();
	
	$scope.getCompanies = function(){
		$http.get("/company/getAll").then(
				function(response){
					$scope.companies = response.data;
					$scope.gridOptions = {
							data: $scope.companies,
							columnDefs: [
								{name: "companyId", 			visible: false, },
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
					angular.extend($scope.gridOptions, $rootScope.defaultGridOptions);

					GlobalSpinner.hide();
				},
				function(response){
					Notification.error("Failed to fetch companies!");
				});		
	};
	
	$scope.getCompanies();
	
	$scope.deleteCompany = function(company){
		var confirm = $window.confirm("Are you sure you want to delete " + company.companyName + "?");
		
		if(confirm){
			GlobalSpinner.show();
			$http({
				method: "POST",
				url: "/company/delete",
				data: JSON.parse(JSON.stringify(company)),
				headers: {"Content-Type": "application/json; charset=utf8"}
			}).then(
					function success(response){
						$scope.getCompanies();
						Notification.success("Successfully deleted " + company.companyName)
					}, 
					function error(response){
						Notification.error("Failed to delete " + company.companyName)
					}
				).finally(function(){
					GlobalSpinner.hide();
				});
		}
	}
	
	$scope.editCompany = function(company){
		var modalOptions = {
				templateUrl: "partials/company/editCompany.html",
				controller: "EditCompanyController",
				resolve: {
					companies: function(){
						return $scope.companies;
					},
					company: function(){
						return JSON.parse(JSON.stringify(company));
					}
				}
			};
		angular.extend(modalOptions, $rootScope.defaultModalOptions)
		var modalInstance = $uibModal.open(modalOptions);
		
		$rootScope.getModalCloseFunctions(modalInstance, "company", false, $scope.getCompanies)
	};
	
	$scope.addCompany = function(){
		var modalOptions = {
				templateUrl: "partials/company/addCompany.html",
				controller: "AddCompanyController",
				resolve: {
					companies: function(){
						return $scope.companies;
					}
				}
			};
		angular.extend(modalOptions, $rootScope.defaultModalOptions);
		var modalInstance = $uibModal.open(modalOptions);
		$rootScope.getModalCloseFunctions(modalInstance, "company", true, $scope.getCompanies);
	};	
});