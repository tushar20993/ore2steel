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

portal.run(function($rootScope, $http, Notification){
	
	$rootScope.getStateCodes = function(){
		$rootScope.stateCodes = [];
		return $http.get("/state_code/getAll").then(
				function(response){
					$rootScope.stateCodes = response.data;
				},
				function(response){
					Notification.error("Failed to get state codes");
				});
	}
	$rootScope.getStateCodes();
	
	$rootScope.getRegistrationStatuses = function(){
		$rootScope.statuses = [];
		return $http.get("/status/getAll").then(
				function(response){
					$rootScope.statuses = response.data;
				},
				function(response){
					Notification.error("Failed to get registration statuses");
				});
	}
	$rootScope.getRegistrationStatuses();
	
	
	$rootScope.getUOMS = function(){
		$rootScope.uoms = [];
		return $http.get("/item/getAllUnits").then(
				function(response){
					$rootScope.uoms = response.data;
				},
				function(response){
					Notification.error("Couldn't fetch units of measurement. Please try again");
				});
	}
	$rootScope.getUOMS();
	
	$rootScope.getModalCloseFunctions = function(modalInstance, modalFor, addNew, successCallback){
		var verbPresent = addNew ? " add " : " edit ";
		var verbPast = addNew ? " added " : " edited ";
		modalInstance.result.then(
				function success(data){
					Notification.success("Successfully" + verbPast + modalFor);
					if(successCallback)
						successCallback();
				},
				function error(data){
					if( (data == "escape key press") || (data == 'cancel') || (data == "close"))
						angular.noop;
					else if (data == "fail")
						Notification.error("Couldn't" + verbPresent + modalFor)
					else
						Notification.error(data);
				}
			);
	};
	
	
	$rootScope.defaultGridOptions = {
			exporterMenuCsv: true,
			enableGridMenu: true,
			enableFiltering : true,
			enableColumnResizing: true,
			enableRowReordering: true,
			rowHeight: 40,
			enableSorting: true
		};
	
	$rootScope.defaultModalOptions = {
			animation: true,
			backdrop: "static",
			keyboard: true,
			size: "lg",
		};
});