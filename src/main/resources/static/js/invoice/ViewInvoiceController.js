portal.controller("InvoiceController", function($scope, $rootScope, $http, $uibModal, Notification, $window){
	$scope.getInvoices = function(){
		$http.get("/invoice/getAll").then(
				function(response){
					$scope.invoices = response.data;
					$scope.gridOptions = {
							data: $scope.invoices,
							columnDefs: [
								{name: "invoiceNumber", 		visible: true,},
								{name: "companyName", 			visible: true, field: "site.siteId.company.companyName",},
								{name: "siteName", 				visible: true, field: "site.siteName",},
								{name: "purchaseOrderNumber", 	visible: true, field: "purchaseOrder.purchaseOrderId.purchaseOrderNumber"},
								{name: "transporter", 			visible: true, field: "transporter.transporterName"},
								{name: "vehicleNumber", 		visible: true, field: "vehicle.vehicleNumber"},
								{name: "Actions", 
									cellTemplate: 
										'<div class="ui-grid-cell-contents row">' + 

										'<button type = "button" class = "btn btn-sm btn-info col-md-4 offset-md-1" ' + 
											'ng-click = "grid.appScope.editInvoice(row.entity)" >' + 
												'<span class="material-icons">mode_edit</span>'+ 
										'</button>' +
										
										'<button type = "button" class = "btn btn-sm btn-danger col-md-4 offset-md-1" ' + 
													'ng-click = "grid.appScope.deleteInvoice(row.entity)" >' + 
													'<span class="material-icons">delete</span>'+ 
										'</button>' + 
											
											
										'</div>',
									enableSorting : false, 
									enableFiltering: false, 
									resizable: false},
							]
						};
					angular.extend($scope.gridOptions, $rootScope.defaultGridOptions);
				},
				function(response){
					Notification.error("Failed to fetch all Invoices")
				});		
	};
	
	$scope.getInvoices();
	
	$scope.deleteInvoice = function(invoice){
		var confirm = $window.confirm("Are you sure you want to delete Invoice: " + invoice.invoiceNumber + "?");
		
		if(confirm){
			$http({
				method: "POST",
				url: "/invoice/delete",
				data: JSON.parse(JSON.stringify(invoice)),
				headers: {"Content-Type": "application/json; charset=utf8"}
			}).then(
					function success(response){
						$scope.getInvoices();
						Notification.success("Successfully deleted " + invoice.invoiceNumber);
					}, 
					function error(response){
						Notification.error("Failed to delete " + invoice.invoiceNumber);
					}
				);
		}
	}
	
	$scope.editInvoice = function(invoice){
		var modalOptions = {
				templateUrl: "partials/invoice/editInvoice.html",
				controller: "EditInvoiceController",
				resolve: {
					invoice: function(){
						return JSON.parse(JSON.stringify(invoice));
					}
				}
			};
		angular.extend(modalOptions, $rootScope.defaultModalOptions);
		var modalInstance = $uibModal.open(modalOptions);
		$rootScope.getModalCloseFunctions(modalInstance, "invoice", false, $scope.getInvoices);
	};
	
	$scope.addInvoice = function(){
		var modalOptions = {
				templateUrl: "partials/invoice/addInvoice.html",
				controller: "AddInvoiceController",
				resolve: {
					invoices: function(){
						return $scope.invoices;
					}
				}
			};
		angular.extend(modalOptions, $rootScope.defaultModalOptions)
		var modalInstance = $uibModal.open(modalOptions);		
		$rootScope.getModalCloseFunctions(modalInstance, "Invoice", true, $scope.getInvoices);
	};
	
	
	
});