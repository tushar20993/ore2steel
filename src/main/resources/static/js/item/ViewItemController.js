portal.controller("ItemController", function($scope, $rootScope, $http, $uibModal){
	$scope.getItems = function(){
		$http.get("/item/getAll").then(
				function(response){
					$scope.items = response.data;
					$scope.gridOptions = {
							exporterMenuCsv: true,
							enableGridMenu: true,
							enableFiltering : true,
							enableColumnResizing: true,
							enableRowReordering: true,
							rowHeight: 40,
							enableSorting: true,
							data: $scope.items,
							columnDefs: [
								{name: "itemName", 				visible: true, },
								{name: "hsnCode", 				visible: true, displayName: "HSN Code"},
								{name: "Actions", 
									cellTemplate: 
										'<div class="ui-grid-cell-contents row">' + 

										'<button type = "button" class = "btn btn-sm btn-info col-md-4 offset-md-1" ' + 
											'ng-click = "grid.appScope.editItem(row.entity)" >' + 
											'<span class="material-icons">mode_edit</span>'+
										'</button>' +
										
										'<button type = "button" class = "btn btn-sm btn-danger col-md-4 offset-md-1" ' + 
													'ng-click = "grid.appScope.deleteItem(row.entity)" >' + 
													'<span class="material-icons">delete</span>'+ 
										'</button>' + 
											
											
										'</div>',
									enableSorting : false, 
									enableFiltering: false, 
									resizable: false},
							]
						};
				},
				function(response){
					console.log("ERROR", response);
				});		
	};
	
	$scope.getItems();
	
	$scope.editItem = function(item){
		var modalInstance = $uibModal.open({
			animation: false,
			templateUrl: "partials/item/editItem.html",
			backdrop: "static",
			keyboard: false,
			size: "lg",
			controller: "EditItemController",
			resolve: {
				item: function(){
					return JSON.parse(JSON.stringify(item));
				}
			}
		});
		
		modalInstance.result.then(function(data){
			if(data.status == 1){
				$scope.getCompanies();
				$rootScope.addAlert(data.msg, "success");
			}
			else if(data.status == 0){
				$rootScope.addAlert(data.msg, "danger");
			}
			else{
				$rootScope.addAlert(data.msg, "info");
			}
		});
	};
	
	$scope.addItem = function(){
		var modalInstance = $uibModal.open({
			animation: false,
			templateUrl: "partials/item/addItem.html",
			backdrop: "static",
			keyboard: false,
			size: "lg",
			controller: "AddItemController",
			resolve: {
				items: function(){
					return $scope.items;
				}
			}
		});
		
		modalInstance.result.then(function(data){
			if(data.status == 1){
				$scope.getItems();
				$rootScope.addAlert(data.msg, "success");
			}
			else if(data.status == 0){
				$rootScope.addAlert(data.msg, "danger");
			}
			else{
				$rootScope.addAlert(data.msg, "info");
			}
		});
	};
	
	
	
});