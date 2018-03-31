portal.controller("AddBrandController", function($scope, $rootScope, $http, $uibModalInstance, brands, GlobalSpinner){
	
	$scope.brand = {};
	$scope.brands = brands;
	
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
			url: "/brand/save",
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