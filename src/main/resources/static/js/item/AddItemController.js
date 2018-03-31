portal.controller("AddItemController", function($scope, $rootScope, $http, $uibModalInstance, items, GlobalSpinner, Notification) {

	$scope.item = {};
	$scope.items = items;

	$scope.close = function() {
		$uibModalInstance.dismiss("cancel");
	};

	$http.get("/item_group/getAll").then(function success(response) {
		$scope.itemGroups = response.data;
		$scope.item.itemGroup = $scope.itemGroups[0];
	}, function fail(response) {
		Notification.error("Failed to get item groups.")
	}).finally(function(){
		GlobalSpinner.hide();
	});

	$scope.saveItem = function() {
		GlobalSpinner.show();
		$http({
			method : "POST",
			url : "/item/save",
			data : JSON.parse(JSON.stringify($scope.item)),
			headers : {
				"Content-Type" : "application/json; charset=utf8"
			}
		}).then(function success(response) {
			GlobalSpinner.hide();
			$uibModalInstance.close("success");
		}, function error(response) {
			GlobalSpinner.hide();
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