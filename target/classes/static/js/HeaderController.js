portal.controller("HeaderController", function($scope, $location){
	
	$scope.isActive = function(viewLocation){
		return (viewLocation == $location.path()) ? "active" : "";
	};
})