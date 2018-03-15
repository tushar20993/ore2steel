portal.controller("VehicleController", function($scope, $rootScope, $http, $uibModal, Notification){
	$scope.getVehicles = function(){
		$http.get("/vehicle/getAll").then(
				function(response){
					$scope.vehicles = response.data;
					$scope.gridOptions = {
							data: $scope.vehicles,
							columnDefs: [
								{name: "vehicleNumber", 		visible: true, },
								{name: "vehicleType", 			visible: true, },
								{name: "vehicleCapacity", 		visible: true, },
								{name: "Actions", 
									cellTemplate: 
										'<div class="ui-grid-cell-contents row">' + 

										'<button type = "button" class = "btn btn-sm btn-info col-md-4 offset-md-1" ' + 
											'ng-click = "grid.appScope.editVehicle(row.entity)" >' + 
											'<span class="material-icons">mode_edit</span>'+
										'</button>' +
										
										'<button type = "button" class = "btn btn-sm btn-danger col-md-4 offset-md-1" ' + 
													'ng-click = "grid.appScope.deleteVehicle(row.entity)" >' + 
													'<span class="material-icons">delete</span>'+ 
										'</button>' + 
											
											
										'</div>',
									enableSorting : false, 
									enableFiltering: false, 
									resizable: false},
							]
						};
					angular.extend($scope.gridOptions, $rootScope.defaultGridOptions);
				},
				function(response){
					Notification.error("Failed to fetch all vehicles");
				});		
	};
	
	$scope.getVehicles();
	
	$scope.editVehicle = function(vehicle){
		var modalOptions = {
				templateUrl: "partials/vehicle/editVehicle.html",
				controller: "EditVehicleController",
				resolve: {
					vehicle: function(){
						return JSON.parse(JSON.stringify(vehicle));
					}
				}
			}
		angular.extend(modalOptions, $rootScope.defaultModalOptions);
		var modalInstance = $uibModal.open(modalOptions);
		$rootScope.getModalCloseFunctions(modalInstance, "vehicle", false, $scope.getVehicles);
	};
	
	$scope.addVehicle = function(){
		var modalOptions = {
				templateUrl: "partials/vehicle/addVehicle.html",
				controller: "AddVehicleController",
				resolve: {
					vehicles: function(){
						return $scope.vehicles;
					}
				}
			};
		angular.extend(modalOptions, $rootScope.defaultModalOptions);
		var modalInstance = $uibModal.open(modalOptions);
		$rootScope.getModalCloseFunctions(modalInstance, "vehicle", true, $scope.getVehicles);
	};
	
});