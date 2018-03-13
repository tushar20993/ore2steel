portal.controller("PurchaseOrderController", function($scope, $rootScope, $http, $uibModal, $window){
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
				}, function fail(response){
					console.log("Failed to get all purchase orders");
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
			}, function error(response){
				console.log(response)
			});
		};
	}
	
	$scope.editPurchaseOrder = function(purchaseOrder){
		var modalInstance = $uibModal.open({
			animation: true,
			templateUrl: "partials/purchase_order/editPurchaseOrder.html",
			backdrop: "static",
			keyboard: true,
			size: "lg",
			controller: "EditPurchaseOrderController",
			resolve: {
				purchaseOrder: function(){
					return purchaseOrder;
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
		},
		function error(data){
			
		});
	};
	
	$scope.getPurchaseOrders();
	
	$scope.addPurchaseOrder = function(){
		var modalInstance = $uibModal.open({
			animation: true,
			templateUrl: "partials/purchase_order/addPurchaseOrder.html",
			backdrop: "static",
			keyboard: true,
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
		},
		function error(data){
			
		});
	};
});