portal.controller("TransporterController", function($scope, $rootScope, $http, $uibModal){
	$scope.getTransporters = function(){
		$http.get("/transporter/getAll").then(
				function(response){
					$scope.transporters = response.data;
					$scope.gridOptions = {
							exporterMenuCsv: true,
							enableGridMenu: true,
							enableFiltering : true,
							enableColumnResizing: true,
							enableRowReordering: true,
							rowHeight: 40,
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
				},
				function(response){
					console.log("ERROR", response);
				});		
	};
	
	$scope.getTransporters();
	
	$scope.editTransporter = function(transporter){
		var modalInstance = $uibModal.open({
			animation: true,
			templateUrl: "partials/transporter/editTransporter.html",
			backdrop: "static",
			keyboard: false,
			size: "lg",
			controller: "EditTransporterController",
			resolve: {
				transporter: function(){
					return JSON.parse(JSON.stringify(transporter));
				}
			}
		});
		
		modalInstance.result.then(function(data){
			if(data.status == 1){
				$scope.getTransporters();
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
	
	$scope.addTransporter = function(){
		var modalInstance = $uibModal.open({
			animation: true,
			templateUrl: "partials/transporter/addTransporter.html",
			backdrop: "static",
			keyboard: false,
			size: "lg",
			controller: "AddTransporterController",
			resolve: {
				transporters: function(){
					return $scope.transporters;
				}
			}
		});
		
		modalInstance.result.then(function(data){
			if(data.status == 1){
				$scope.getTransporters();
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