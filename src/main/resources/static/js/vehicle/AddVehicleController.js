portal.controller("AddVehicleController", function($scope, $rootScope, $http, $uibModalInstance, vehicles){
	
	$scope.vehicle = {};
	$scope.vehicles = vehicles;

	$scope.close = function(){
		$uibModalInstance.close({status: 2, msg: "You closed the window"});
	};
	
	$rootScope.vehicleTypes = [];
	$http.get("/vehicle/getTypes").then(
			function(response){
				$rootScope.vehicleTypes = response.data;
			},
			function(response){
				console.log("Failed to get vehicle Types");
			});
	
	
	$scope.saveVehicle = function(){
		$http({
			method: "POST",
			url: "/vehicle/save",
			data: JSON.parse(JSON.stringify($scope.vehicle)),
			headers: {"Content-Type": "application/json; charset=utf8"}
		}).then(function success(response){
			$uibModalInstance.close({status: 1, msg: "Successfully saved vehicle!"});
		}, function error(response){
			$uibModalInstance.close({status: 0, msg: "Failed to save vehicle!"});
		});
	};
	
	$scope.onVehicleTypeaheadSelect = function(item, model, label){
		$uibModalInstance.close({status: 2, msg: label + " already exists!"});
	}
	
});