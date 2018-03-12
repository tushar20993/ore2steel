portal.controller("SiteController", function($scope, $rootScope, $http, $uibModal, $window){
	
	
	$scope.getSites = function(){
		$scope.sites = [];
		$http.get("/site/getAll").then(
				function(response){
					$scope.sites = response.data;
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
								{name: "siteId", 				visible: true, field: "siteId.siteId"},
								{name: "companyName", 			visible: true, cellTemplate: '<div class="ui-grid-cell-contents wrap no-overflow" white-space: normal>{{row.entity.siteId.companyName}}</div>'},
								{name: "siteName", 				visible: true, },
								{name: "siteAddress", 			visible: false, },
								{name: "stateCode", 			visible: true, cellTemplate: '<div class="ui-grid-cell-contents wrap no-overflow" white-space: normal>{{row.entity.stateCode.stateName}}</div>', displayName: "State", field: "stateCode.stateName"},
								{name: "gstNumber", 			visible: true, },
								{name: "contactPerson", 		visible: true, },
								{name: "contactPerson", 		visible: true, },
								{name: "contactNumber", 		visible: true, },
								{name: "sitePan", 				visible: false, },
								{name: "Actions", 
									cellTemplate: 
										'<div class="ui-grid-cell-contents row">' + 

										'<button type = "button" class = "btn btn-sm btn-info col-md-4 offset-md-1" ' + 
											'ng-click = "grid.appScope.editSite(row.entity)" >' + 
													'<span class="material-icons">mode_edit</span>'+
										'</button>' +
										
										'<button type = "button" class = "btn btn-sm btn-danger col-md-4 offset-md-1" ' + 
													'ng-click = "grid.appScope.deleteSite(row.entity)" >' + 
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
	
	$scope.getSites();
	
	$scope.deleteSite = function(site){
		var confirm = $window.confirm("Are you sure you want to delete " + site.siteName + " in " + site.siteId.companyName+ "?");
		$http({
			method: "POST",
			url: "/site/delete",
			data: JSON.parse(JSON.stringify(site)),
			headers: {"Content-Type": "application/json; charset=utf8"}
		}).then(function success(response){
			$scope.getSites();
			$rootScope.addAlert("Successfully deleted site", "success");
		}, function error(response){
			$rootScope.addAlert("Failed to delete site", "danger");
		});
	}
	
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

