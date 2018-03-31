portal.controller("ItemController", function($scope, $rootScope, $http, $uibModal, Notification, GlobalSpinner, $window){
	GlobalSpinner.show();
	$scope.gridOptions = {};
	$scope.getItems = function(){
		$http.get("/item/getAll").then(
				function(response){
					$scope.items = response.data;
					$scope.gridOptions = {
							data: $scope.items,
							columnDefs: [
								{name: "itemName", 				visible: true, },
								{name: "hsnCode", 				visible: true, displayName: "HSN Code"},
								{name: "itemGroup", 			visible: true},
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
					angular.extend($scope.gridOptions, $rootScope.defaultGridOptions);
					GlobalSpinner.hide();
				},
				function(response){
					GlobalSpinner.hide();
					Notification.error("Failed to fetch all items");
				});		
	};
	
	$scope.getItems();
	
	$scope.deleteItem = function(item){
		var confirm = $window.confirm("Are you sure you want to delete " + item.itemName + " ?");
		if(confirm){
			GlobalSpinner.show();
			$http.post("/item/delete", item).then(
				function success(response){
				Notification.success("Successfully delete " + item.itemName)
				$scope.getItems();
			}, function error(response){
				Notification.error("Failed to delete item");
			}).finally(function(){
				GlobalSpinner.hide();
			})
		}
	}
	
	$scope.editItem = function(item){
		var modalOptions = {
				templateUrl: "partials/item/editItem.html",
				controller: "EditItemController",
				resolve: {
					item: function(){
						return JSON.parse(JSON.stringify(item));
					}
				}
			}
		angular.extend(modalOptions, $rootScope.defaultModalOptions)
		var modalInstance = $uibModal.open(modalOptions);
		$rootScope.getModalCloseFunctions(modalInstance, "item", false, $scope.getItems);
	};
	
	$scope.addItem = function(){
		var modalOptions = {
				templateUrl: "partials/item/addItem.html",
				controller: "AddItemController",
				resolve: {
					items: function(){
						return $scope.items;
					}
				}
			}
		angular.extend(modalOptions, $rootScope.defaultModalOptions);
		var modalInstance = $uibModal.open(modalOptions);
		$rootScope.getModalCloseFunctions(modalInstance, "item", true, $scope.getItems);
	};

});