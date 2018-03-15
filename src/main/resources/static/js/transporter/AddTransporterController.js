portal.controller("AddTransporterController", function($scope, $rootScope, $http, $uibModalInstance, transporters){
	$scope.transporter = {};
	$scope.transporters = transporters;
	
	$scope.stateCodes =  JSON.parse(JSON.stringify($rootScope.stateCodes));
	$scope.statuses = JSON.parse(JSON.stringify($rootScope.statuses));	
	
		
	$scope.close = function(){
		$uibModalInstance.dismiss("cancel");
	};
	
	$scope.saveTransporter = function(){
		$http({
			method: "POST",
			url: "/transporter/save",
			data: JSON.parse(JSON.stringify($scope.transporter)),
			headers: {"Content-Type": "application/json; charset=utf8"}
		}).then(function success(response){
			$uibModalInstance.close("success");
		}, function error(response){
			$uibModalInstance.dismiss("fail")
		});
	}
	

	$scope.onTransporterTypeaheadSelect = function(item, model, label){
		$uibModalInstance.dismiss({status: 2, msg: label + " already exists!"});
	}
	
});