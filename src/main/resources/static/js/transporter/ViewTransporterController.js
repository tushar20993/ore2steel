portal.controller("TransporterController", function($scope, $rootScope, $http, $uibModal, Notification){
	$scope.getTransporters = function(){
		$http.get("/transporter/getAll").then(
				function(response){
					$scope.transporters = response.data;
					$scope.gridOptions = {
							enableSorting: true,
							data: $scope.transporters,
							columnDefs: [
								{name: "transporterName", 		visible: true, },
								{name: "contactPerson", 		visible: true, },
								{name: "stateCode", 			field: "stateCode.stateName", displayName: "State", visible: true, },
								{name: "contactNumber", 		visible: true, },
								{name: "transporterPan", 		visible: true, displayName: "PAN Number"},
								{name: "Actions", 
									cellTemplate: 
										'<div class="ui-grid-cell-contents row">' + 

										'<button type = "button" class = "btn btn-sm btn-info col-md-4 offset-md-1" ' + 
											'ng-click = "grid.appScope.editTransporter(row.entity)" >' + 
											'<span class="material-icons">mode_edit</span>'+
										'</button>' +
										
										'<button type = "button" class = "btn btn-sm btn-danger col-md-4 offset-md-1" ' + 
													'ng-click = "grid.appScope.deleteTransporter(row.entity)" >' + 
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
					Notification.error("Failed to fetch transporter information");
				});		
	};
	
	$scope.getTransporters();
	
	$scope.editTransporter = function(transporter){
		var modalOptions = {
				templateUrl: "partials/transporter/editTransporter.html",
				controller: "EditTransporterController",
				resolve: {
					transporter: function(){
						return JSON.parse(JSON.stringify(transporter));
					}
				}
			}
		angular.extend(modalOptions, $rootScope.defaultModalOptions);
		var modalInstance = $uibModal.open(modalOptions);
		$rootScope.getModalCloseFunctions(modalInstance, "transporter", false, $scope.getTransporters);
	};
	
	$scope.addTransporter = function(){
		var modalOptions = {
				animation: true,
				templateUrl: "partials/transporter/addTransporter.html",
				controller: "AddTransporterController",
				resolve: {
					transporters: function(){
						return $scope.transporters;
					}
				}
			}
		angular.extend(modalOptions, $rootScope.defaultModalOptions);
		var modalInstance = $uibModal.open(modalOptions);
		$rootScope.getModalCloseFunctions(modalInstance, "transporter", true, $scope.getTransporters);
	};
	
});