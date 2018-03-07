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
	
	$scope.orderStatuses = [];
	$http.get("/order_status/getAll").then(
			function(response){
				$scope.orderStatuses = response.data;
			},
			function(response){
				console.error(response.data);
			});
	
	

	$scope.companySelected = function(){
		var company = $scope.purchaseOrder.company;
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
		$scope.purchaseOrder.purchaseOrderId.site = JSON.parse(JSON.stringify($scope.purchaseOrder.site));
		delete $scope.purchaseOrder.site;
		
		$scope.purchaseOrder.purchaseOrderId.site.siteId.company = JSON.parse(JSON.stringify($scope.purchaseOrder.company));
		delete $scope.purchaseOrder.company;
		
		console.log($scope.purchaseOrder);
		$http({
			method: "POST",
			url: "/purchase_order/save",
			data: JSON.parse(JSON.stringify($scope.purchaseOrder)),
			headers: {"Content-Type": "application/json; charset=utf8"}
		}).then(function success(response){
			$uibModalInstance.close({status: 1, msg: "Successfully saved purchase order!"});
		}, function error(response){
			//$uibModalInstance.close({status: 0, msg: "Failed to save purchase order: " + response.data.message});
		});
	};
	
	$scope.onCompanyTypeaheadSelect = function(item, model, label){
		$uibModalInstance.close({status: 2, msg: label + " already exists!"});
	}
	
});