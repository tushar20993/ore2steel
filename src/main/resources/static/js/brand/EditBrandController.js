portal.controller("EditBrandController", function($scope, $rootScope, $http, $uibModalInstance, brand, GlobalSpinner){
	
	$scope.brand = brand;
	
	$http.get("/brand_group/getAll").then(
			function success(response){
				$scope.brandGroups = response.data;
			}, function error(response){
				Notification.error("Failed to fetch brand groups. Please try again later");
			});

	$scope.close = function(){
		$uibModalInstance.dismiss("cancel");
	};
	
	$scope.saveBrand = function(){
		GlobalSpinner.show();
		$http({
			method: "POST",
			url: "/brand/update",
			data: JSON.parse(JSON.stringify($scope.brand)),
			headers: {"Content-Type": "application/json; charset=utf8"}
		}).then(function success(response){
			GlobalSpinner.hide();
			$uibModalInstance.close("success");
		}, function error(response){
			GlobalSpinner.hide();
			$uibModalInstance.dismiss("fail");
		});
	};
	
	$scope.onBrandTypeaheadSelect = function(item, model, label){
		$uibModalInstance.dismiss({status: 2, msg: label + " already exists!"});
	}
	
});