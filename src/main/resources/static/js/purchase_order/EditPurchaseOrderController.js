portal.controller("EditPurchaseOrderController", function($scope, $rootScope, $http, $uibModalInstance, purchaseOrder, $window){

	$scope.purchaseOrder = purchaseOrder;
	if($scope.purchaseOrder.orderDate){
		$scope.purchaseOrder.orderDate = new Date($scope.purchaseOrder.orderDate);
	}
	
	if($scope.purchaseOrder.orderStatusDate){
		$scope.purchaseOrder.orderStatusDate = new Date($scope.purchaseOrder.orderStatusDate);
	}
	
	$scope.getOrderItems = function(){
		$http.post("/order_item/getFor", $scope.purchaseOrder).then(
				function(response){
					$scope.purchaseOrder.items = response.data;
				},
				function(response){
					console.error(response.data);
				});
	}
	$scope.getOrderItems();
	
	
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
	
	$scope.orderStatuses = [];
	$http.get("/order_status/getAll").then(
			function(response){
				$scope.orderStatuses = response.data;
			},
			function(response){
				console.error(response.data);
			});
	
	
	$scope.itemEdited = function(orderItem){
		orderItem.isDirty = true;
	}
	
	
	$scope.close = function(){
		$uibModalInstance.close({status: 2, msg: "You closed the window"});
	};
	
	$scope.savePurchaseOrder = function(){		
		var purchaseOrder = JSON.parse(JSON.stringify($scope.purchaseOrder));
		$http({
			method: "POST",
			url: "/purchase_order/update",
			data: purchaseOrder,
			headers: {"Content-Type": "application/json; charset=utf8"}
		}).then(function success(response){
			
			var newItems = [];
			for(var i = 0; i < purchaseOrder.items.length; i++){
				if(purchaseOrder.items[i].isNew || purchaseOrder.items[i].isDirty){
					delete purchaseOrder.items[i].isNew;
					newItems.push(purchaseOrder.items[i]);
				}
			}
			if(newItems.length > 0){
				$http.post("/order_item/save", newItems).then(
						function success(response){
							$uibModalInstance.close({status: 1, msg: "Successfully saved purchase order!"});
						}, function error(response){
							alert("Failed to save items")
						}
					);
			}
			$uibModalInstance.close({status: 1, msg: "Successfully saved purchase order!"});
		}, function error(response){
			console.log(response)
			$uibModalInstance.close({status: 0, msg: "Failed to save purchase order: " + response.data.message});
		});
	};
	
	$scope.onCompanyTypeaheadSelect = function(item, model, label){
		$uibModalInstance.close({status: 2, msg: label + " already exists!"});
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
				$window.alert("Item already exists")
				$scope.purchaseOrder.items.splice(index, 1);
			}
		}
	}
	
	$scope.addItem = function(){
		var item = {};
		item.orderItemId = {}
		item.orderItemId.purchaseOrder = {}
		item.orderItemId.purchaseOrder.purchaseOrderId = {}
		item.isNew = true;
		item.orderItemId.purchaseOrder.purchaseOrderId.purchaseOrderNumber = $scope.purchaseOrder.purchaseOrderId.purchaseOrderNumber;
		item.orderItemId.purchaseOrder.purchaseOrderId.site = $scope.purchaseOrder.purchaseOrderId.site;
		$scope.purchaseOrder.items.push(item);
	}
	
	$scope.deleteItem = function(index){
		if($scope.purchaseOrder.items[index].isNew){
			$scope.purchaseOrder.items.splice(index, 1);
			return;
		}
		
		var deleteItem = $window.confirm("Are you sure you want to delete this item?");
		if(!deleteItem){
			return;
		}
		
		var orderItem = $scope.purchaseOrder.items[index]; 
		$http({
			method: "POST",
			url: "/order_item/delete",
			data: JSON.parse(JSON.stringify(orderItem)),
			headers: {"Content-Type": "application/json; charset=utf8"}
		}).then(function success(response){
			$scope.getOrderItems();
		}, function error(response){
			alert("Could not delete Item");
		});
	}
	
});