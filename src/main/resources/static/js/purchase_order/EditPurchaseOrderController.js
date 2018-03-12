portal.controller("EditPurchaseOrderController", function($scope, $rootScope, $http, $uibModalInstance, purchaseOrder, $window){

	$scope.purchaseOrder = purchaseOrder;
	if($scope.purchaseOrder.orderDate){
		$scope.purchaseOrder.orderDate = new Date($scope.purchaseOrder.orderDate);
	}
	
	if($scope.purchaseOrder.orderStatusDate){
		$scope.purchaseOrder.orderStatusDate = new Date($scope.purchaseOrder.orderStatusDate);
	}
	
	$http.post("/order_item/getFor", $scope.purchaseOrder).then(
			function(response){
				$scope.purchaseOrder.items = response.data;
			},
			function(response){
				console.error(response.data);
			});
	
	
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
	
	
	
	$scope.close = function(){
		$uibModalInstance.close({status: 2, msg: "You closed the window"});
	};
	
	$scope.savePurchaseOrder = function(){		
		console.log($scope.purchaseOrder)
		$http({
			method: "POST",
			url: "/purchase_order/update",
			data: JSON.parse(JSON.stringify($scope.purchaseOrder)),
			headers: {"Content-Type": "application/json; charset=utf8"}
		}).then(function success(response){
			$uibModalInstance.close({status: 1, msg: "Successfully saved purchase order!"});
		}, function error(response){
			console.log(response)
			$uibModalInstance.close({status: 0, msg: "Failed to save purchase order: " + response.data.message});
		});
	};
	
	$scope.onCompanyTypeaheadSelect = function(item, model, label){
		$uibModalInstance.close({status: 2, msg: label + " already exists!"});
	}
	
	$scope.addItem = function(){
		var item = {};
		item.isNew = true;
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