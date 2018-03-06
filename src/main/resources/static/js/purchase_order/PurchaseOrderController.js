portal.controller("PurchaseOrderController", function($scope, $rootScope, $http, $uibModal){
	console.log("Purchase Order Controller");
	
	$scope.purchaseOrder = {};
	
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
							data: $scope.purchaseOrders,
							columnDefs: [
								{name: "purchaseOrderNumber", 	visible: true, cellTemplate: '<div class="ui-grid-cell-contents wrap no-overflow" white-space: normal>{{row.entity.purchaseOrderId.purchaseOrderNumber}}</div>', field: "purchaseOrderId.purchaseOrderNumber"},
								{name: "companyName", 			visible: true, cellTemplate: '<div class="ui-grid-cell-contents wrap no-overflow" white-space: normal>{{row.entity.purchaseOrderId.site.siteId.companyName}}</div>', field: "purchaseOrderId.site.siteId.companyName"},
								{name: "siteName", 				visible: true, cellTemplate: '<div class="ui-grid-cell-contents wrap no-overflow" white-space: normal>{{row.entity.purchaseOrderId.site.siteName}}</div>', field: "purchaseOrderId.site.siteName"},
							]
						};
				}, function fail(response){
					console.log("Failed to get all purchase orders");
				});
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