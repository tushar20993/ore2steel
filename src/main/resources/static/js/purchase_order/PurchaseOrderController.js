portal.controller("PurchaseOrderController", function($scope, $rootScope, $http, $uibModal){
	$scope.getPurchaseOrders = function(){
		$http.get("/purchase_order/getAll").then(
				function success(response){
					
					$scope.purchaseOrders = response.data;
					$scope.gridOptions = {
							exporterMenuCsv: true,
							enableGridMenu: true,
							enableFiltering : true,
							enableColumnResizing: true,
							enableRowReordering: true,
							enableSorting: true,
							rowHeight: 40,
							data: $scope.purchaseOrders,
							columnDefs: [
								{name: "purchaseOrderNumber", 	visible: true, field: "purchaseOrderId.purchaseOrderNumber"},
								{name: "orderDate", 			visible: true, field: "orderDate", cellFilter: 'date:\'dd-MM-yyyy\'', filterCellFiltered: true },
								{name: "companyName", 			visible: true, field: "purchaseOrderId.site.siteId.companyName"},
								{name: "siteName", 				visible: true, field: "purchaseOrderId.site.siteName"},
								{name: "Edit", 
									cellTemplate: 
										'<div class="ui-grid-cell-contents row">' + 

										'<button type = "button" class = "btn btn-sm btn-info col-md-4 offset-md-1" ' + 
											'ng-click = "grid.appScope.editOrder(row.entity)" >' + 
												'Edit'+ 
										'</button>' +
										
										'<button type = "button" class = "btn btn-sm btn-danger col-md-4 offset-md-1" ' + 
													'ng-click = "grid.appScope.deleteOrder(row.entity)" >' + 
													'Delete'+ 
										'</button>' + 
											
											
										'</div>',
									enableSorting : false, 
									enableFiltering: false, 
									resizable: false},
							]
						};
				}, function fail(response){
					console.log("Failed to get all purchase orders");
				});
	}

	$scope.deleteOrder = function(po){
		console.log(po);
	}
	$scope.editOrder = function(po){
		console.log(po);
	}
	
	$scope.getPurchaseOrders();
	
	$scope.addPurchaseOrder = function(){
		var modalInstance = $uibModal.open({
			animation: false,
			templateUrl: "partials/purchase_order/addPurchaseOrder.html",
			backdrop: "static",
			keyboard: false,
			size: "lg",
			controller: "AddPurchaseOrderController",
			resolve: {
				purchaseOrders: function(){
					return $scope.purchaseOrders;
				}
			}
		});
		
		modalInstance.result.then(function(data){
			if(data.status == 1){
				$scope.getPurchaseOrders();
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