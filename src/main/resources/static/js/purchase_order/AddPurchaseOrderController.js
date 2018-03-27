portal.controller("AddPurchaseOrderController", function($scope, $rootScope, $http, $uibModalInstance, Notification){
	
	$scope.purchaseOrder = {};
	$scope.purchaseOrder.orderDate = new Date();
	$scope.purchaseOrder.orderStatusDate = new Date();
	$scope.purchaseOrder.items = [];
	$scope.companies = [];
	$scope.statuses = [];
	$scope.items = [];
	$scope.brands = [];
	$scope.uoms = [];

	$http.get("/item/getAllUnits").then(
			function(response){
				$scope.uoms = response.data;
			},
			function(response){
				Notification.error("Failed to fetch Unit of Measurements");
			});
	
	$http.get("/brand/getAll").then(
			function(response){
				$scope.brands = response.data;
			},
			function(response){
				Notification.error("Failed to fetch brands");
			});
	
	$http.get("/item/getAll").then(
			function(response){
				$scope.items= response.data;
			},
			function(response){
				Notification.error("Failed to fetch items");
			});
	

	$http.get("/company/getAll").then(
			function(response){
				$scope.companies = response.data;
			},
			function(response){
				Notification.error("Failed to fetch companies");
			});
	
	$scope.orderStatuses = [];
	$http.get("/order_status/getAll").then(
			function(response){
				$scope.orderStatuses = response.data;
				$scope.purchaseOrder.orderStatus = $scope.orderStatuses[0];
			},
			function(response){
				Notification.error("Failed to get order status types");
			});

	
	$scope.onCompanySelect = function(){
		var company = $scope.purchaseOrder.company;
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
		var site = $scope.purchaseOrder.site;
		if(site == undefined){
			$scope.purchaseOrders = [];
			return;
		}
		
		$http.post("/purchase_order/getBySite", site)
			.then(
					function success(response){
						$scope.purchaseOrders = response.data;
					},
					function fail(){
						Notification.error("Failed to fetch purchase orders for the given site");
					}
					);
		
	}
	
	$scope.onPurchaseOrderSelect = function(){
		Notification.error("This purchase order number already exists. Please try a different one");
		delete $scope.purchaseOrder.purchaseOrderId.purchaseOrderNumber; 
	}

	$scope.itemSelected = function(item){
		for(var i = 0; i < $scope.items.length; i++){
			if($scope.items[i].itemId == item.itemId){
				//$scope.items.splice(i, 1);
				// not needed to do this on item selection, as two same items can be of different brands
				return true;
			}
		}
	}
	
	$scope.brandSelected = function(index){
		var item = $scope.purchaseOrder.items[index].item;
		var brand = $scope.purchaseOrder.items[index].brand;
		var info = $scope.purchaseOrder.items[index].additionalInformation;
		for(var i = 0; i < $scope.purchaseOrder.items.length; i++){
			if(i == index){
				continue;
			}
			var currItem = $scope.purchaseOrder.items[i].item;
			var currBrand = $scope.purchaseOrder.items[i].brand;
			var currInfo = $scope.purchaseOrder.items[i].additionalInformation;
			if(		(item.itemId == currItem.itemId) && 
					(brand.brandId == currBrand.brandId) &&
					(info == currInfo)){
				Notification.error("Same item, brand & specifications already exist!");
				$scope.purchaseOrder.items.splice(index, 1);
			}
		}
	}
	
	$scope.addItem = function(){
		var item = {};
		item.unitOfMeasurement = $scope.uoms[0];
		item.quantity = 0;
		item.price = 0;
		$scope.purchaseOrder.items.push(item);
	}
	
	$scope.deleteItem = function(index){
		$scope.purchaseOrder.items.splice(index, 1);
	}
	
	$scope.savePurchaseOrder = function(){		
		$scope.purchaseOrder.purchaseOrderId.site = JSON.parse(JSON.stringify($scope.purchaseOrder.site));
		$scope.purchaseOrder.purchaseOrderId.site.siteId.company = JSON.parse(JSON.stringify($scope.purchaseOrder.company));

		$http({
			method: "POST",
			url: "/purchase_order/save",
			data: JSON.parse(JSON.stringify($scope.purchaseOrder)),
			headers: {"Content-Type": "application/json; charset=utf8"}
		}).then(function success(response){
			$uibModalInstance.close("success");
		}, function error(response){
			$uibModalInstance.dismiss("fail");
		});
	};
	
	$scope.updateAmount = function(index){
		var item = $scope.purchaseOrder.items[index];
		item.amount = item.price * item.quantity;
	}

	$scope.close = function(){
		$uibModalInstance.dismiss("cancel");
	};
	
});