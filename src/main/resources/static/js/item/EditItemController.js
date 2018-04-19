portal.controller("EditItemController", function($scope, $rootScope, $http, $uibModalInstance, item, GlobalSpinner, Notification) {

	$scope.item = item;
	$scope.item.hsn.hsnCode = parseInt($scope.item.hsn.hsnCode)
	
	$scope.close = function() {
		$uibModalInstance.dismiss("cancel");
	};

	GlobalSpinner.show();
	$http.get("/item_group/getAll").then(function success(response) {
		$scope.itemGroups = response.data;
		$scope.item.itemGroup = $scope.itemGroups[0];
	}, function fail(response) {
		Notification.error("Failed to get item groups.")
	}).finally(function(){
		GlobalSpinner.hide();
	});

	$scope.saveItem = function() {
		$http({
			method : "POST",
			url : "/item/save",
			data : JSON.parse(JSON.stringify($scope.item)),
			headers : {
				"Content-Type" : "application/json; charset=utf8"
			}
		}).then(function success(response) {
			$uibModalInstance.close("success");
		}, function error(response) {
			$uibModalInstance.dismiss("fail");
		});
	};

	$scope.onItemTypeaheadSelect = function(item, model, label) {
		$uibModalInstance.close({
			status : 2,
			msg : label + " already exists!"
		});
	}

});