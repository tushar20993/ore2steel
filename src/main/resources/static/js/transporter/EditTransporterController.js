portal.controller("EditTransporterController", function($scope, $rootScope, $http, $uibModalInstance, transporter){
	$scope.transporter = transporter;
	
	$scope.close = function(){
		$uibModalInstance.dismiss("cancel");
	};
	
	$scope.saveTransporter = function(){
		var site = JSON.parse(JSON.stringify($scope.transporter));
		$http({
			method: "POST",
			url: "/transporter/update",
			data: $scope.transporter,
			headers: {"Content-Type": "application/json; charset=utf8"}
		}).then(function success(response){
			$uibModalInstance.close("success");
		}, function error(response){
			$uibModalInstance.dismiss("fail");
		});
	}
	
});