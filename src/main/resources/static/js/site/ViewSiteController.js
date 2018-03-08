portal.controller("SiteController", function($scope, $rootScope, $http, $uibModal){
	console.log("Site Controller");
	
	
	$scope.getSites = function(){
		$scope.sites = [];
		$http.get("/site/getAll").then(
				function(response){
					$scope.sites = response.data;
					console.log($scope.sites)
					$scope.gridOptions = {
							exporterMenuCsv: true,
							enableGridMenu: true,
							enableFiltering : true,
							enableColumnResizing: true,
							enableRowReordering: true,
							data: $scope.sites,
							rowHeight: 40,
							enableSorting: true,
							columnDefs: [
								{name: "companyName", 			visible: true, cellTemplate: '<div class="ui-grid-cell-contents wrap no-overflow" white-space: normal>{{row.entity.siteId.companyName}}</div>'},
								{name: "siteName", 				visible: true, },
								{name: "siteAddress", 			visible: false, },
								{name: "stateCode", 			visible: true, cellTemplate: '<div class="ui-grid-cell-contents wrap no-overflow" white-space: normal>{{row.entity.stateCode.stateName}}</div>', displayName: "State", field: "stateCode.stateName"},
								{name: "gstNumber", 			visible: true, },
								{name: "contactPerson", 		visible: true, },
								{name: "contactPerson", 		visible: true, },
								{name: "contactNumber", 		visible: true, },
								{name: "sitePan", 				visible: false, },
								{name: "Modify", 
									cellTemplate: 
										'<div class="ui-grid-cell-contents row">' + 

										'<button type = "button" class = "btn btn-sm btn-info col-md-4 offset-md-1" ' + 
											'ng-click = "grid.appScope.editSite(row.entity)" >' + 
												'Edit'+ 
										'</button>' +
										
										'<button type = "button" class = "btn btn-sm btn-danger col-md-4 offset-md-1" ' + 
													'ng-click = "grid.appScope.deleteSite(row.entity)" >' + 
													'Delete'+ 
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
	
	$scope.getSites();
	
	$scope.editSite = function(site){
		var modalInstance = $uibModal.open({
			animation: false,
			templateUrl: "partials/site/editSite.html",
			backdrop: "static",
			keyboard: false,
			size: "lg",
			controller: "EditSiteController",
			resolve: {
				site: function(){
					return JSON.parse(JSON.stringify(site));
				}
			}
		});
		
		modalInstance.result.then(function(data){
			console.log(data);
			if(data.status == 1){
				$scope.getSites();
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
	
	
	$scope.addSite = function(){
		var modalInstance = $uibModal.open({
			animation: false,
			templateUrl: "partials/site/addSite.html",
			backdrop: "static",
			keyboard: false,
			size: "lg",
			controller: "AddSiteController",
			resolve: {
				sites: function(){
					return $scope.sites;
				}
			}
		});
		
		modalInstance.result.then(function(data){
			if(data.status == 1){
				$scope.getSites();
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

