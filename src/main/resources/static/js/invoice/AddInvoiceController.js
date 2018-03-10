portal.controller("AddInvoiceController", function($scope, $rootScope, $http, $uibModalInstance, sites){
	$scope.invoice = {};
	$scope.invoices = invoices;
	
	$http.get("/company/getAll").then(
			function success(response){
				$scope.companies = response.data;
			}, function fail(response){
				alert("error in getting companies");
			});
	
	$scope.onCompanySelect = function(){
		var company = $scope.purchaseOrder.company;
		$http.get("/site/get?id=" + company.companyId).then(
				function success(response){
					$scope.sites = response.data;				
				},
				function fail(response){
					console.log("Error in getting sites for " + company.companyName);
				});
	};
	
	$scope.onCompanySelect = function(){
		var company = $scope.purchaseOrder.company;
		var site = $scope.purchaseOrder.site;
		$http.get("/site/get?cid=" + company.companyId + "&sid=" + site.siteId).then(
				function success(response){
					$scope.purchaseOrders = response.data;				
				},
				function fail(response){
					console.log("Error in getting purchase orders for " + company.companyName);
				});
	};
	
		
	$scope.close = function(){
		$uibModalInstance.close({status: 2, msg: "You closed the window"});
	};
	
	$scope.saveInvoice = function(){
		$http({
			method: "POST",
			url: "/invoice/save",
			data: JSON.parse(JSON.stringify($scope.invoice)),
			headers: {"Content-Type": "application/json; charset=utf8"}
		}).then(function success(response){
			$uibModalInstance.close({status: 1, msg: "Successfully saved invoice!"});
		}, function error(response){
			$uibModalInstance.close({status: 0, msg: "Failed to save invoice!"});
		});
	}
	
});