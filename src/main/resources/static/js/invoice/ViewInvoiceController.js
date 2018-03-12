portal.controller("InvoiceController", function($scope, $rootScope, $http, $uibModal){
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
								{name: "invoiceNumber", 		visible: true, cellTemplate: '<div class="ui-grid-cell-contents wrap no-overflow" white-space: normal>{{row.entity.invoiceNumber}}</div>'},
								{name: "purchaseOrderNumber", 	visible: true, field: "purchaseOrder.purchaseOrderId.purchaseOrderNumber"},
								{name: "siteName", 				visible: true, field: "purchaseOrder.purchaseOrderId.site.siteName", cellTemplate: '<div class="ui-grid-cell-contents wrap no-overflow" white-space: normal>{{row.entity.stateCode.stateName}}</div>', displayName: "State", field: "stateCode.stateName"},
								{name: "companyName", 			visible: true, field: "purchaseOrder.purchaseOrderId.site.siteId.company.companyName",},
								{name: "transporter", 			visible: true, field: "transporter.transporterName"},
								{name: "vehicleNumber", 		visible: true, field: "vehicle.vehicleNumber"},
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