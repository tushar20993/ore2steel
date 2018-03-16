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
		if(company == undefined){
			$scope.sites = [];
			return;
		}
		$http.get("/site/get?id=" + company.companyId).then(
				function success(response){
					$scope.sites = response.data;
				},
				function fail(response){
					Notification.error("Error in getting sites for " + company.companyName);
				});
	};
	
	$scope.onSiteSelect = function(){
		var site = $scope.invoice.site;
		if(site == undefined){
			$scope.purchaseOrders = [];
			return;
		}
		$http.post("/purchase_order/getBySite", site).then(
				function success(response){
					$scope.purchaseOrders = response.data;
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
			}, function fail(response){
				Notification.error("Failed to get vehicles. Please try again later!")
			});
	
	$scope.invoiceStatuses = [];
	$http.get("/invoice_status/getAll").then(
			function success(response){
				$scope.invoiceStatuses = response.data;
			},
			function fail(response){
				Notification.error("Failed to get invoice status types. Please try again later!");
			});	
	
		
	$scope.close = function(){
		$uibModalInstance.dismiss("cancel");
	};
	
	$scope.saveInvoice = function(){
		var invoice = JSON.parse(JSON.stringify($scope.invoice))
		if(invoice.purchaseOrder){
			delete invoice.site;
		}
		
		if(!invoice.transporter.transporterId){
			var temp = invoice.transporter;
			invoice.transporter = {}
			invoice.transporter.transporterName = temp;
		}
		if(!invoice.vehicle.vehicleNumber){
			var temp = invoice.vehicle;
			invoice.vehicle = {}
			invoice.vehicle.vehicleNumber = temp;
		}
		
		$http({
			method: "POST",
			url: "/invoice/save",
			data: JSON.parse(JSON.stringify(invoice)),
			headers: {"Content-Type": "application/json; charset=utf8"}
		}).then(function success(response){
			$uibModalInstance.close("success");
		}, function error(response){
			Notification.error(response.data.message)
			//$uibModalInstance.dismiss("fail");
		});
	}
	
});