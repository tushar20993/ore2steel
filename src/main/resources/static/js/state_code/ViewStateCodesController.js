portal.controller("StateCodesController", function($scope, $rootScope, $http, $uibModal){
	$scope.getStateCodes = function(){
		$http.get("/state_code/getAll").then(
				function success(response){
					$scope.stateCodes = response.data;
					$scope.gridOptions = {
							exporterMenuCsv: true,
							enableGridMenu: true,
							enableFiltering : true,
							enableColumnResizing: true,
							enableRowReordering: true,
							enableSorting: true,
							rowHeight: 40,
							data: $scope.stateCodes
						};
				}, function fail(response){
					console.log("Failed to get all state codes");
				});
	}


	
	$scope.getStateCodes();
});