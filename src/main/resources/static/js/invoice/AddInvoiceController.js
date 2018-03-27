portal.controller("AddInvoiceController", function($scope, $rootScope, $http, $uibModalInstance, Notification, invoices){
	$scope.invoice = {};
	$scope.invoices = invoices;
	$scope.invoice.invoiceDate = new Date();
	$scope.invoice.invoiceStatusDate = new Date();
	
	$scope.uoms = $rootScope.uoms;
	
	$http.get("/company/getAll").then(
			function success(response){
				$scope.companies = response.data;
			}, function fail(response){
				Notification.error("Failed to get companies. Please try again later!")
			});
	

	$scope.onCompanySelect = function(){
		$scope.sites = [];
		var company = $scope.invoice.company;
		if(company == undefined){
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
		$scope.purchaseOrders = [];
		var site = $scope.invoice.site;
		if(site == undefined){
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
	
	$scope.onPurchaseOrderSelect = function(){
		var purchaseOrder = $scope.invoice.purchaseOrder;
		if( (purchaseOrder == undefined) || (purchaseOrder == null) ){
			$scope.invoice.items = [];
			return;
		}
		
		$http.post("/order_item/getFor", purchaseOrder).then(
				function success(response){
					$scope.invoice.items = response.data;
				}, function fail(response){
					Notification.error("Failed to fetch details for the purchase order. Enter manually, or try again later.")
				});
		
	}
	
	$scope.onInvoiceTypeaheadSelect = function(){
		Notification.error("This invoice number already exists. Please try different Invoice Number");
		$scope.invoice.invoiceNumber = "";
	}
	
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
	
	$http.get("/invoice_status/getAll").then(
			function success(response){
				$scope.invoiceStatuses = response.data;
				$scope.invoice.invoiceStatus = $scope.invoiceStatuses[1];
			},
			function fail(response){
				Notification.error("Failed to get invoice status types. Please try again later!");
			});	
	
		
	$scope.close = function(){
		$uibModalInstance.dismiss("cancel");
	};
	
	$scope.invoice.items = [];
	$scope.addItem = function(){
		var newItem = {};
		$scope.invoice.items.push(newItem);
	}
	
	$scope.deleteItem = function(index){
		$scope.invoice.items.splice(index, 1);
	}
	
	$scope.saveInvoice = function(){
		var invoice = JSON.parse(JSON.stringify($scope.invoice))
		
		if(invoice.transporter && !invoice.transporter.transporterId){
			var temp = invoice.transporter;
			invoice.transporter = {}
			invoice.transporter.transporterName = temp;
		}
		if(invoice.vehicle && !invoice.vehicle.vehicleNumber){
			var temp = invoice.vehicle;
			invoice.vehicle = {}
			invoice.vehicle.vehicleNumber = temp;
		}
		console.log(invoice)
		
		
		return $http.post( "/invoice/save", invoice)
		.then(
				function success(response){
					$uibModalInstance.close("success");
				}, function error(response){
					$uibModalInstance.dismiss("fail");
				}
			);
	}
});