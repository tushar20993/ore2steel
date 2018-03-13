portal.controller("VehicleController", function($scope, $rootScope, $http, $uibModal){
	$scope.getVehicles = function(){
		$http.get("/vehicle/getAll").then(
				function(response){
					$scope.vehicles = response.data;
					$scope.gridOptions = {
							exporterMenuCsv: true,
							enableGridMenu: true,
							enableFiltering : true,
							enableColumnResizing: true,
							enableRowReordering: true,
							rowHeight: 40,
							enableSorting: true,
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
				},
				function(response){
					console.log("ERROR", response);
				});		
	};
	
	$scope.getVehicles();
	
	$scope.editVehicle = function(vehicle){
		var modalInstance = $uibModal.open({
			animation: true,
			templateUrl: "partials/vehicle/editVehicle.html",
			backdrop: "static",
			keyboard: false,
			size: "lg",
			controller: "EditVehicleController",
			resolve: {
				vehicle: function(){
					return JSON.parse(JSON.stringify(vehicle));
				}
			}
		});
		
		modalInstance.result.then(function(data){
			if(data.status == 1){
				$scope.getVehicles();
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
	
	$scope.addVehicle = function(){
		var modalInstance = $uibModal.open({
			animation: true,
			templateUrl: "partials/vehicle/addVehicle.html",
			backdrop: "static",
			keyboard: false,
			size: "lg",
			controller: "AddVehicleController",
			resolve: {
				vehicles: function(){
					return $scope.vehicles;
				}
			}
		});
		
		modalInstance.result.then(function(data){
			if(data.status == 1){
				$scope.getVehicles();
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