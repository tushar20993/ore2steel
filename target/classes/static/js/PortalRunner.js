portal = angular.module("PortalRunner", ['ngAria', 'ngMessages', 'ngAnimate', 'ngRoute', 'ui.grid', 'ui.bootstrap', 'ui.grid.resizeColumns', 'ui-notification']);

portal.config(function($routeProvider, $locationProvider){
	$routeProvider
	.when("/companies", {templateUrl: "partials/company/viewCompanies.html", controller: "CompanyController"})
	.when("/sites", {templateUrl: "partials/site/viewSites.html", controller: "SiteController"})
	.when("/purchase_orders", {templateUrl: "partials/purchase_order/viewPurchaseOrders.html", controller: "PurchaseOrderController"})
	.when("/invoices", {templateUrl: "partials/invoice/viewInvoices.html", controller: "InvoiceController"})
	.when("/brands", {templateUrl: "partials/brand/viewBrands.html", controller: "BrandController"})
	.when("/items", {templateUrl: "partials/item/viewItems.html", controller: "ItemController"})
	.when("/state_codes", {templateUrl: "partials/state_code/viewStateCodes.html", controller: "StateCodesController"})
	.when("/transporters", {templateUrl: "partials/transporter/viewTransporters.html", controller: "TransporterController"})
	.when("/vehicles", {templateUrl: "partials/vehicle/viewVehicles.html", controller: "VehicleController"})
});

portal.run(function($rootScope, $http){
	$rootScope.alerts = [];	
	$rootScope.closeAlert = function(index){
		$rootScope.alerts.splice(index, 1);
	};
	
	$rootScope.addAlert = function(message, type){
		$rootScope.alerts.push({
			msg: message,
			type: type 
		});
	};
	
	$rootScope.getStateCodes = function(){
		$rootScope.stateCodes = [];
		$http.get("/state_code/getAll").then(
				function(response){
					$rootScope.stateCodes = response.data;
				},
				function(response){
					console.log("Failed to get state codes");
				});
	}
	$rootScope.getStateCodes();
	
	$rootScope.getRegistrationStatuses = function(){
		$rootScope.statuses = [];
		$http.get("/status/getAll").then(
				function(response){
					$rootScope.statuses = response.data;
				},
				function(response){
					console.log("Failed to get registration statuses");
				});
	}
	$rootScope.getRegistrationStatuses();
});