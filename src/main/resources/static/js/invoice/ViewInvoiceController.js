portal.controller("InvoiceController", function($scope, $rootScope, $http, $uibModal){
	
	console.log("Invoice Controller");
	
	$scope.getInvoices = function(){
		$http.get("/invoice/getAll").then(
				function(response){
					$scope.invoices = response.data;
					$scope.gridOptions = {
							exporterMenuCsv: true,
							enableGridMenu: true,
							enableFiltering : true,
							enableColumnResizing: true,
							enableRowReordering: true,
							data: $scope.invoices,
							rowHeight: 40,
							enableSorting: true,
							columnDefs: [
								{name: "companyName", 			visible: true, cellTemplate: '<div class="ui-grid-cell-contents wrap no-overflow" white-space: normal>{{row.entity.companyName}}</div>'},
								{name: "companyAddress", 		visible: true, },
								{name: "stateCode", 			visible: true, cellTemplate: '<div class="ui-grid-cell-contents wrap no-overflow" white-space: normal>{{row.entity.stateCode.stateName}}</div>', displayName: "State", field: "stateCode.stateName"},
								{name: "pinCode", 				visible: true, displayName: "PIN Code"},
								{name: "gstNumber", 			visible: true, displayName: "GSTIN"},
								{name: "registrationStatus", 	visible: false, displayName: "GST Type"},
								{name: "contactPerson", 		visible: true, },
								{name: "contactNumber", 		visible: true, },
								{name: "Edit", 
									cellTemplate: 
										'<div class="ui-grid-cell-contents row">' + 

										'<button type = "button" class = "btn btn-sm btn-info col-md-4 offset-md-1" ' + 
											'ng-click = "grid.appScope.editCompany(row.entity)" >' + 
												'Edit'+ 
										'</button>' +
										
										'<button type = "button" class = "btn btn-sm btn-danger col-md-4 offset-md-1" ' + 
													'ng-click = "grid.appScope.deleteCompany(row.entity)" >' + 
													'Delete'+ 
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
	
	$scope.getInvoices();
	
	$scope.editInvoice = function(invoice){
		var modalInstance = $uibModal.open({
			animation: false,
			templateUrl: "partials/invoice/editInvoice.html",
			backdrop: "static",
			keyboard: false,
			size: "lg",
			controller: "EditInvoiceController",
			resolve: {
				invoice: function(){
					return JSON.parse(JSON.stringify(invoice));
				}
			}
		});
		
		modalInstance.result.then(function(data){
			if(data.status == 1){
				$scope.getInvoices();
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
	
	$scope.addInvoice = function(){
		var modalInstance = $uibModal.open({
			animation: false,
			templateUrl: "partials/invoice/addInvoice.html",
			backdrop: "static",
			keyboard: false,
			size: "lg",
			controller: "AddInvoiceController",
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