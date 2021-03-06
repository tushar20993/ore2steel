portal.controller("EditPurchaseOrderController", function($scope, $rootScope, $http, $uibModalInstance, purchaseOrder, $window, Notification){

	$scope.uoms = $rootScope.uoms;
	$scope.orderStatuses = $rootScope.orderStatuses;
	$scope.purchaseOrder = purchaseOrder;

	
	$scope.items = $rootScope.items;
	
	$rootScope.getBrands().then(function(response){
		$scope.brands = $rootScope.brands;
	});
	
	if($scope.purchaseOrder.orderDate){
		$scope.purchaseOrder.orderDate = new Date($scope.purchaseOrder.orderDate);
	}
	
	if($scope.purchaseOrder.orderStatusDate){
		$scope.purchaseOrder.orderStatusDate = new Date($scope.purchaseOrder.orderStatusDate);
	}
	
	$scope.getOrderItems = function(){
		return $http.post("/order_item/getFor", $scope.purchaseOrder).then(
				function(response){
					$scope.purchaseOrder.items = response.data;
				},
				function(response){
					Notification.error("Failed to get order items for selected purchase order. Please try again");
				});
	}
	$scope.getOrderItems();	
	
	
	$scope.itemEdited = function(orderItem){
		orderItem.isDirty = true;
	}
	
	
	$scope.close = function(){
		$uibModalInstance.dismiss('cancel');
	};
	
	$scope.savePurchaseOrder = function(){		
		var purchaseOrder = JSON.parse(JSON.stringify($scope.purchaseOrder));
		$http.post("/purchase_order/update", purchaseOrder).then(
				function success(response){
					$uibModalInstance.close("success");
				}, function error(response){
					$uibModalInstance.dismiss("fail");
				});
		};
	
	
	
	$scope.brandSelected = function(index){
		var item = $scope.purchaseOrder.items[index].item;
		var brand = $scope.purchaseOrder.items[index].brand;
		var info = $scope.purchaseOrder.items[index].additionalInformation;
		for(var i = 0; i < $scope.purchaseOrder.items.length; i++){
			if(i == index){
				continue;
			}
			var orderItem = $scope.purchaseOrder.items[i];
			var currItem = $scope.purchaseOrder.items[i].item;
			var currBrand = $scope.purchaseOrder.items[i].brand;
			var currInfo = $scope.purchaseOrder.items[i].additionalInformation;
			if(		(item.itemId == currItem.itemId) && 
					(brand.brandId == currBrand.brandId) &&
					(info == currInfo) ){
				Notification.error("Warning! Same item and brand already exists!");
			}
		}
	}
	
	$scope.addItem = function(){
		var item = {};
		item.purchaseOrder = {}
		item.purchaseOrder.purchaseOrderId = {}
		item.isNew = true;
		item.purchaseOrder.purchaseOrderId.purchaseOrderNumber = $scope.purchaseOrder.purchaseOrderId.purchaseOrderNumber;
		item.purchaseOrder.purchaseOrderId.site = $scope.purchaseOrder.purchaseOrderId.site;
		item.unitOfMeasurement = $scope.uoms[0];
		item.quantity = 0;
		item.price = 0;
		item.amount = 0;
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
		$http.post("/order_item/delete", orderItem).then(function success(response){
			Notification.success("Successfully deleted item");
			$scope.purchaseOrder.items.splice(index, 1);
		}, function error(response){
			Notification.error("Could not delete Item");
		});
	}
	
	$scope.getTotalAmount = function(){
		var total = 0.0;
		angular.forEach($scope.purchaseOrder.items, function(orderItem){
			if(orderItem.amount){
				total = total + orderItem.amount;
			}
		})
		return total;
	};
	
	$scope.getTotalQuantity = function(){
		var total = 0.0;
		angular.forEach($scope.purchaseOrder.items, function(orderItem){
			if(!orderItem.item || orderItem.item == undefined){
				return;
			}
			if(orderItem.item.itemGroup == "Item" || orderItem.item.itemGroup == "Sales Item"){
				total = total + orderItem.quantity;
			}
		})
		return total;
	}
	
	$scope.getBasicAmount = function(){
		var total = 0;
		for(var i = 0 ; i < $scope.purchaseOrder.items.length; i ++){
			var orderItem = $scope.purchaseOrder.items[i];
			if((orderItem.item != undefined) && orderItem.item.itemGroup != "Rates & Taxes"){
				orderItem = JSON.parse(JSON.stringify(orderItem))
				total = total + orderItem.amount;
			}
		}
		return total;
	}
	
	
	$scope.$watch('purchaseOrder.items', function(newVal, oldVal){
		if(!oldVal || !newVal ){
			return;
		}
		
		var index = -1;
		for(var i = 0; i < newVal.length; i++){
			if(!oldVal[i] || !newVal[i] || angular.equals(oldVal[i], newVal[i])){
				continue;
			}
			index = i;
			// if equal, amount NOT changed
			if(angular.equals(oldVal[i].amount, newVal[i].amount)){ 
				$rootScope.makeCalculations(newVal[i], $scope.getBasicAmount());
				newVal[i].overridden = false;
			}
			else{
				newVal[i].overridden = true;
			}
			break;
		}
		var items = newVal;
		for(var i = 0; i < items.length; i ++){
			var item = items[i];
			if((i==index) || !newVal[i] || !oldVal[i] ){
				continue;
			}
			if(!item.overridden){
				$rootScope.makeCalculations(item, $scope.getBasicAmount());
				newVal[i].overridden = false;
			}
		}
	}, true)
});