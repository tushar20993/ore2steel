portal.controller("PurchaseOrderController", function($scope, $rootScope, $http, $uibModal, $window, Notification){
	
	$scope.getPurchaseOrders = function(){
		$http.get("/purchase_order/getAll").then(
				function success(response){
					
					$scope.purchaseOrders = response.data;
					$scope.gridOptions = {
							data: $scope.purchaseOrders,
							columnDefs: [
								{name: "purchaseOrderNumber", 	visible: true, field: "purchaseOrderId.purchaseOrderNumber"},
								{name: "orderDate", 			visible: true, field: "orderDate", cellFilter: 'date:\'dd-MM-yyyy\'', filterCellFiltered: true },
								{name: "companyName", 			visible: true, field: "purchaseOrderId.site.siteId.companyName"},
								{name: "siteName", 				visible: true, field: "purchaseOrderId.site.siteName"},
								{name: "orderStatus", 			visible: true, field: "orderStatus"},
								{name: "Actions", 
									cellTemplate: 
										'<div class="ui-grid-cell-contents row">' + 

										'<button type = "button" class = "btn btn-sm btn-info col-md-4 offset-md-1" ' + 
											'ng-click = "grid.appScope.editPurchaseOrder(row.entity)" >' + 
													'<span class="material-icons">mode_edit</span>'+ 
										'</button>' +
										
										'<button type = "button" class = "btn btn-sm btn-danger col-md-4 offset-md-1" ' + 
													'ng-click = "grid.appScope.deletePurchaseOrder(row.entity)" >' + 
													'<span class="material-icons">delete</span>'+ 
										'</button>' + 
											
											
										'</div>',
									enableSorting : false, 
									enableFiltering: false, 
									resizable: false},
							]
						};
					angular.extend($scope.gridOptions, $rootScope.defaultGridOptions);
				}, function fail(response){
					Notification.error("Failed to get all purchase orders");
				});
	}

	$scope.deletePurchaseOrder = function(purchaseOrder){
		deleteOrder = $window.confirm("Are you sure you want to delete this Purchase Order?");
		if(deleteOrder){
			$http({
				method: "POST",
				url: "/purchase_order/delete",
				data: JSON.parse(JSON.stringify(purchaseOrder)),
				headers: {"Content-Type": "application/json; charset=utf8"}
			}).then(function success(response){
				$scope.getPurchaseOrders();
				Notification.success("Successfully deleted purchase order");
			}, function error(response){
				Notification.error("Failed to delete purchase order");
			});
		};
	}
	
	$scope.editPurchaseOrder = function(purchaseOrder){
		var modalOptions = {
				templateUrl: "partials/purchase_order/editPurchaseOrder.html",
				controller: "EditPurchaseOrderController",
				windowClass: 'wide-modal',
				resolve: {
					purchaseOrder: function(){
						return purchaseOrder;
					}
				}
			};
		angular.extend(modalOptions, $rootScope.defaultModalOptions);
		var modalInstance = $uibModal.open(modalOptions);
		$rootScope.getModalCloseFunctions(modalInstance, "Purchase Order", false, $scope.getPurchaseOrders);
	};
	
	$scope.getPurchaseOrders();
	
	$scope.addPurchaseOrder = function(){
		var modalOptions = {
				templateUrl: "partials/purchase_order/addPurchaseOrder.html",
				controller: "AddPurchaseOrderController",
				resolve: {
					purchaseOrders: function(){
						return $scope.purchaseOrders;
					}
				}
			};
		angular.extend(modalOptions, $rootScope.defaultModalOptions);
		var modalInstance = $uibModal.open(modalOptions);		
		$rootScope.getModalCloseFunctions(modalInstance, "Purchase Order", true, $scope.getPurchaseOrders);
	};
});