portal.controller("AddItemController", function($scope, $rootScope, $http, $uibModalInstance, items){
	
	$scope.item = {};
	$scope.items = items;

	$scope.close = function(){
		$uibModalInstance.dismiss("cancel");
	};
	
	$scope.saveItem = function(){
		$http({
			method: "POST",
			url: "/item/save",
			data: JSON.parse(JSON.stringify($scope.item)),
			headers: {"Content-Type": "application/json; charset=utf8"}
		}).then(function success(response){
			$uibModalInstance.close("success");
		}, function error(response){
			$uibModalInstance.dismiss("fail");
		});
	};
	
	$scope.onItemTypeaheadSelect = function(item, model, label){
		$uibModalInstance.close({status: 2, msg: label + " already exists!"});
	}
	
});