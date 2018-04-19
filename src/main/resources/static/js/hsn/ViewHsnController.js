portal.controller("HsnController", function($scope, $rootScope, GlobalSpinner, uiGridConstants){
	
	GlobalSpinner.show();
	$rootScope.getHsns().then(function(){
		$scope.hsns = JSON.parse(JSON.stringify($rootScope.hsns));
		GlobalSpinner.hide();
		$scope.gridOptions = {
				columnDefs: [
					{field: 'hsnCode', filter: {condition: uiGridConstants.filter.STARTS_WITH}},
					{field: 'description', cellTemplate: 
						'<div uib-tooltip="{{row.entity.description}}" tooltip-append-to-body="true">{{row.entity.description}}</div>'
						}
				],
				exporterMenuCsv: true,
				enableGridMenu: true,
				enableFiltering : true,
				enableColumnResizing: true,
				enableRowReordering: true,
				enableSorting: true,
				data: $scope.hsns
			};
		
	});

});