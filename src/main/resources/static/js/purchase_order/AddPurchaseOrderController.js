portal.controller("AddPurchaseOrderController", function($scope, $rootScope, $http, $uibModalInstance){
	
	$scope.today = new Date();
	$scope.purchaseOrder = {};
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
				console.error(response.data);
			});
	
	$http.get("/brand/getAll").then(
			function(response){
				$scope.brands = response.data;
			},
			function(response){
				console.error(response.data);
			});
	
	$http.get("/item/getAll").then(
			function(response){
				$scope.items= response.data;
			},
			function(response){
				console.error(response.data);
			});
	

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
				console.error("Failed to get order status types");
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

	$scope.itemSelected = function(item){
		for(var i = 0; i < $scope.items.length; i++){
			if($scope.items[i].itemId == item.itemId){
				//$scope.items.splice(i, 1);
				return true;
			}
		}
	}
	
	$scope.brandSelected = function(index){
		var item = $scope.purchaseOrder.items[index].orderItemId.item;
		var brand = $scope.purchaseOrder.items[index].orderItemId.brand;
		for(var i = 0; i < $scope.purchaseOrder.items.length; i++){
			if(i == index){
				continue;
			}
			var currItem = $scope.purchaseOrder.items[i].orderItemId.item;
			var currBrand = $scope.purchaseOrder.items[i].orderItemId.brand;
			if(	(item.itemId == currItem.itemId) && (brand.brandId == currBrand.brandId) ){
				$scope.purchaseOrder.items.splice(index, 1);
			}
		}
	}
	
	$scope.addItem = function(){
		var item = {};
		$scope.purchaseOrder.items.push(item);
	}
	
	$scope.deleteItem = function(index){
		$scope.purchaseOrder.items.splice(index, 1);
	}
	
	$scope.savePurchaseOrder = function(){		
		$scope.purchaseOrder.purchaseOrderId.site = JSON.parse(JSON.stringify($scope.purchaseOrder.site));
		$scope.purchaseOrder.purchaseOrderId.site.siteId.company = JSON.parse(JSON.stringify($scope.purchaseOrder.company));
		
		for(var i = 0; i < $scope.purchaseOrder.items.length; i ++){
			$scope.purchaseOrder.items[i].orderItemId.site = $scope.purchaseOrder.site;
		}
		
		delete $scope.purchaseOrder.site;
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
			$uibModalInstance.close({status: 0, msg: "Failed to save purchase order: " + response.data.message});
			alert(response.data.message);
		});
	};

	$scope.close = function(){
		$uibModalInstance.close({status: 2, msg: "You closed the window"});
	};
	
});