portal.controller("PurchaseOrderController", function($scope, $rootScope, $http, $uibModal){
	console.log("Purchase Order Controller");
	
	$scope.purchaseOrder = {};
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
				$scope.getCompanies();
				$rootScope.addAlert(data.msg, "success");
			}
			else if(data.status == 0){
				$rootScope.addAlert(data.msg, "danger");
			}
			else{
				$rootScope.addAlert(data.msg, data.type);
			}
		});
	};
	
	$scope.gridOptions = {
			exporterMenuCsv: true,
			enableGridMenu: true,
			enableFiltering : true,
			enableColumnResizing: true,
			enableRowReordering: true,
			enableSorting: true,
			data: $scope.purchaseOrders,
			columnDefs: [
				{name: "companyName", 			visible: true, cellTemplate: '<div class="ui-grid-cell-contents wrap no-overflow" white-space: normal>{{row.entity.companyName}}</div>'},
				{name: "companyAddress", 		visible: true, },
				{name: "companyPan", 			visible: true, },
				{name: "registrationStatus", 	visible: true, },
				{name: "gstNumber", 			visible: true, },
				{name: "contactPerson", 		visible: true, },
				{name: "contactNumber", 		visible: true, },
			]
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
		console.log(1);
		alert("Company Selected")
	}
	
	
	$scope.close = function(){
		$uibModalInstance.close("close");
	};
	
	$scope.savePurchaseOrder = function(){
		console.log($scope.purchaseOrder);
		
		$http({
			method: "POST",
			url: "/purchase_order/save",
			data: JSON.parse(JSON.stringify($scope.company)),
			headers: {"Content-Type": "application/json; charset=utf8"}
		}).then(function success(response){
			$uibModalInstance.close({status: 1, msg: "Successfully saved purchase order!"});
		}, function error(response){
			$uibModalInstance.close({status: 0, msg: "Failed to save purchase order!"});
		});
	};
	
	$scope.onCompanyTypeaheadSelect = function(item, model, label){
		$uibModalInstance.close({status: 2, msg: label + " already exists!"});
	}
	
});