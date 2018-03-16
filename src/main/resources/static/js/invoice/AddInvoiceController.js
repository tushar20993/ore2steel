portal.controller("AddInvoiceController", function($scope, $rootScope, $http, $uibModalInstance, Notification, invoices){
	$scope.invoice = {};
	$scope.invoices = invoices;
	$scope.invoice.invoiceDate = new Date();
	
	$http.get("/company/getAll").then(
			function success(response){
				$scope.companies = response.data;
			}, function fail(response){
				Notification.error("Failed to get companies. Please try again later!")
			});
	

	$scope.onCompanySelect = function(){
		var company = $scope.invoice.company;
		$http.get("/site/get?id=" + company.companyId).then(
				function success(response){
					$scope.sites = response.data;
					console.log($scope.sites)
				},
				function fail(response){
					Notification.error("Error in getting sites for " + company.companyName);
				});
	};
	
	$scope.onSiteSelect = function(){
		var site = $scope.invoice.site;
		$http.post("/purchase_order/getBySite", site).then(
				function success(response){
					$scope.purchaseOrders = response.data;
					console.log($scope.purchaseOrders)
				},
				function fail(response){
					Notification.error("Error in getting POs for " + site.siteName);
				});
	};
	
	$http.get("/transporter/getAll").then(
			function success(response){
				$scope.transporters = response.data;
			}, function fail(response){
				Notification.error("Failed to get transporters. Please try again later!")
			});
	
	
	$http.get("/vehicle/getAll").then(
			function success(response){
				$scope.vehicles = response.data;
				console.log($scope.vehicles)
			}, function fail(response){
				Notification.error("Failed to get vehicles. Please try again later!")
			});
	
	$scope.invoiceStatuses = [];
	$http.get("/invoice_status/getAll").then(
			function(response){
				$scope.invoiceStatuses = response.data;
			},
			function(response){
				Notification.error("Failed to get invoice status types");
			});	
	
		
	$scope.close = function(){
		$uibModalInstance.dismiss("cancel");
	};
	
	$scope.saveInvoice = function(){
		$scope.invoice.site.siteId.company = $scope.invoice.company;
		console.log($scope.invoice);
		$http({
			method: "POST",
			url: "/invoice/save",
			data: JSON.parse(JSON.stringify($scope.invoice)),
			headers: {"Content-Type": "application/json; charset=utf8"}
		}).then(function success(response){
			$uibModalInstance.close("success");
		}, function error(response){
			Notification.error(response.data.message)
			//$uibModalInstance.dismiss("fail");
		});
	}
	
});