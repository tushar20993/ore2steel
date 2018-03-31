portal.controller("StateCodesController", function($scope, $rootScope, GlobalSpinner){
	
	GlobalSpinner.show();
	$scope.stateCodes = JSON.parse(JSON.stringify($rootScope.stateCodes));
	GlobalSpinner.hide();
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
	

});