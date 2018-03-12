portal.controller("AddBrandController", function($scope, $rootScope, $http, $uibModalInstance, brands){
	
	$scope.brand = {};
	$scope.brands = brands;

	$scope.close = function(){
		$uibModalInstance.close({status: 2, msg: "You closed the window"});
	};
	
	$scope.saveBrand = function(){
		$http({
			method: "POST",
			url: "/brand/save",
			data: JSON.parse(JSON.stringify($scope.brand)),
			headers: {"Content-Type": "application/json; charset=utf8"}
		}).then(function success(response){
			$uibModalInstance.close({status: 1, msg: "Successfully saved brand!"});
		}, function error(response){
			$uibModalInstance.close({status: 0, msg: "Failed to save brand!"});
		});
	};
	
	$scope.onBrandTypeaheadSelect = function(item, model, label){
		$uibModalInstance.close({status: 2, msg: label + " already exists!"});
	}
	
});