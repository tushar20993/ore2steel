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


portal.controller("AddPurchaseOrderController", function($scope, $rootScope, $http, $uibModalInstance){
	$scope.purchaseOrder = {};
	$scope.companies = [];
	$scope.statuses = [];
	$http.get("/company/getAll").then(
			function(response){
				$scope.companies = response.data;
			},
			function(response){
				console.error(response.data);
			});

	$scope.companySelected = function(){
		var company = $scope.purchaseOrder.purchaseOrderId.company;
		$http.get("/site/get?id=" + company.companyId).then(
				function success(response){
					$scope.sites = response.data;				
				},
				function fail(response){
					console.log("Error in getting sites for " + company.companyName);
				});
	};
	
	
	$scope.close = function(){
		$uibModalInstance.close({status: 2, msg: "You closed the window"});
	};
	
	$scope.savePurchaseOrder = function(){
		console.log($scope.purchaseOrder);
		$scope.purchaseOrder.purchaseOrderId.site.siteId.company = $scope.purchaseOrder.purchaseOrderId.company;
		$http({
			method: "POST",
			url: "/purchase_order/save",
			data: JSON.parse(JSON.stringify($scope.purchaseOrder)),
			headers: {"Content-Type": "application/json; charset=utf8"}
		}).then(function success(response){
			$uibModalInstance.close({status: 1, msg: "Successfully saved purchase order!"});
		}, function error(response){
			$uibModalInstance.close({status: 0, msg: "Failed to save purchase order: " + response.data.message});
		});
	};
	
	$scope.onCompanyTypeaheadSelect = function(item, model, label){
		$uibModalInstance.close({status: 2, msg: label + " already exists!"});
	}
	
});