portal = angular.module("PortalRunner", ['ngAria', 'ngMessages', 'ngAnimate', 'ngRoute', 'ui.grid', 'ui.bootstrap', 'ui.grid.resizeColumns']);

portal.config(function($routeProvider, $locationProvider){
	$routeProvider
	.when("/brands", {templateUrl: "partials/brand/viewBrands.html", controller: "BrandController"})
	.when("/companies", {templateUrl: "partials/company/viewCompanies.html", controller: "CompanyController"})
	.when("/items", {templateUrl: "partials/item/viewItems.html", controller: "ItemController"})
	.when("/purchase_orders", {templateUrl: "partials/purchase_order/viewPurchaseOrders.html", controller: "PurchaseOrderController"})
	.when("/sites", {templateUrl: "partials/site/viewSites.html", controller: "SiteController"})
	.when("/state_codes", {templateUrl: "partials/state_code/viewStateCodes.html", controller: "StateCodesController"})
});

portal.run(function($rootScope, $timeout){
	$rootScope.alerts = [];	
	$rootScope.closeAlert = function(index){
		$rootScope.alerts.splice(index, 1);
	}
	
	$rootScope.addAlert = function(message, type){
		var numAlerts = $rootScope.alerts.length;
		$rootScope.alerts.push({
			msg: message,
			type: type 
		});
	}
});