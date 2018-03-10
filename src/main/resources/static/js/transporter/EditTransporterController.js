portal.controller("EditTransporterController", function($scope, $rootScope, $http, $uibModalInstance, transporter){
	$scope.transporter = transporter;
	
	$scope.close = function(){
		$uibModalInstance.close({status: 2, msg: "You closed the window"});
	};
	
	$scope.saveTransporter = function(){
		var site = JSON.parse(JSON.stringify($scope.transporter));
		$http({
			method: "POST",
			url: "/transporter/update",
			data: $scope.transporter,
			headers: {"Content-Type": "application/json; charset=utf8"}
		}).then(function success(response){
			$uibModalInstance.close({status: 1, msg: "Successfully saved transporter!"});
		}, function error(response){
			$uibModalInstance.close({status: 0, msg: "Failed to save transporter!"});
		});
	}
	
});