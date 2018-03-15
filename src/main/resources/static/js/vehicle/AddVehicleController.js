portal.controller("AddVehicleController", function($scope, $rootScope, $http, $uibModalInstance, vehicles, Notification){
	
	$scope.vehicle = {};
	$scope.vehicles = vehicles;

	$scope.close = function(){
		$uibModalInstance.dismiss("cancel");
	};
	
	$rootScope.vehicleTypes = [];
	$http.get("/vehicle/getTypes").then(
			function(response){
				$rootScope.vehicleTypes = response.data;
			},
			function(response){
				Notification.error("Failed to get vehicle Types");
			});
	
	
	$scope.saveVehicle = function(){
		$http({
			method: "POST",
			url: "/vehicle/save",
			data: JSON.parse(JSON.stringify($scope.vehicle)),
			headers: {"Content-Type": "application/json; charset=utf8"}
		}).then(function success(response){
			$uibModalInstance.close("success");
		}, function error(response){
			$uibModalInstance.dismiss("fail");
		});
	};
	
	$scope.onVehicleTypeaheadSelect = function(item, model, label){
		$uibModalInstance.dismiss({status: 2, msg: label + " already exists!"});
	}
	
});