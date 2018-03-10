portal.controller("AddTransporterController", function($scope, $rootScope, $http, $uibModalInstance, transporters){
	$scope.transporter = {};
	$scope.transporters = transporters;
	
	$scope.stateCodes =  JSON.parse(JSON.stringify($rootScope.stateCodes));
	$scope.statuses = JSON.parse(JSON.stringify($rootScope.statuses));	
	
		
	$scope.close = function(){
		$uibModalInstance.close({status: 2, msg: "You closed the window"});
	};
	
	$scope.saveTransporter = function(){
		$http({
			method: "POST",
			url: "/transporter/save",
			data: JSON.parse(JSON.stringify($scope.transporter)),
			headers: {"Content-Type": "application/json; charset=utf8"}
		}).then(function success(response){
			$uibModalInstance.close({status: 1, msg: "Successfully saved transporter!"});
		}, function error(response){
			$uibModalInstance.close({status: 0, msg: "Failed to save transporter!"});
		});
	}
	

	$scope.onTransporterTypeaheadSelect = function(item, model, label){
		$uibModalInstance.close({status: 2, msg: label + " already exists!"});
	}
	
});