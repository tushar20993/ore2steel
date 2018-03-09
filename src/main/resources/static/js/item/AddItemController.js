portal.controller("AddItemController", function($scope, $rootScope, $http, $uibModalInstance, items){
	
	$scope.item = {};
	$scope.items = items;

	$scope.close = function(){
		$uibModalInstance.close({status: 2, msg: "You closed the window"});
	};
	
	$scope.saveItem = function(){
		console.log($scope.company);
		
		$http({
			method: "POST",
			url: "/item/save",
			data: JSON.parse(JSON.stringify($scope.item)),
			headers: {"Content-Type": "application/json; charset=utf8"}
		}).then(function success(response){
			$uibModalInstance.close({status: 1, msg: "Successfully saved item!"});
		}, function error(response){
			$uibModalInstance.close({status: 0, msg: "Failed to save item!"});
		});
	};
	
	$scope.onItemTypeaheadSelect = function(item, model, label){
		$uibModalInstance.close({status: 2, msg: label + " already exists!"});
	}
	
});