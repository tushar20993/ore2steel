portal.controller("SiteController", function($scope, $rootScope, $http, $uibModal, $window, Notification, GlobalSpinner){
	GlobalSpinner.show();
	$scope.getSites = function(){
		$scope.gridOptions = {};
		$scope.sites = [];
		$http.get("/site/getAll").then(
				function(response){
					$scope.sites = response.data;
					$scope.gridOptions = {
							data: $scope.sites,
							columnDefs: [
								{name: "siteId", 				visible: false, field: "siteId.siteId"},
								{name: "companyName", 			visible: true, cellTemplate: '<div class="ui-grid-cell-contents wrap no-overflow" white-space: normal>{{row.entity.siteId.companyName}}</div>'},
								{name: "siteName", 				visible: true, },
								{name: "siteAddress", 			visible: false, },
								{name: "stateCode", 			visible: true, displayName: "State", field: "stateCode.stateName"},
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
					angular.extend($scope.gridOptions, $rootScope.defaultGridOptions)
					GlobalSpinner.hide();
				},
				function(response){
					Notification.error("Failed to get all sites");
					GlobalSpinner.hide();
				});		
	};
	
	$scope.getSites();
	
	$scope.deleteSite = function(site){
		var confirm = $window.confirm("Are you sure you want to delete " + site.siteName + " in " + site.siteId.companyName+ "?");
		if(confirm){
			$http({
				method: "POST",
				url: "/site/delete",
				data: JSON.parse(JSON.stringify(site)),
				headers: {"Content-Type": "application/json; charset=utf8"}
			}).then(function success(response){
				$scope.getSites();
				Notification.success("Deleted " + site.siteName + " from " + site.siteId.company.companyName)
			}, function error(response){
				Notification.error("Failed to delete " + site.siteName + " from " + site.siteId.company.companyName)
			});
		}			
	}
	
	$scope.editSite = function(site){
		var modalOptions = {
				templateUrl: "partials/site/editSite.html",
				controller: "EditSiteController",
				resolve: {
					site: function(){
						return JSON.parse(JSON.stringify(site));
					}
				}
			}
		angular.extend(modalOptions, $rootScope.defaultModalOptions)
		var modalInstance = $uibModal.open(modalOptions);
		$rootScope.getModalCloseFunctions(modalInstance, "site", false, $scope.getSites);
	};
	
	
	$scope.addSite = function(){
		var modalOptions = {
				templateUrl: "partials/site/addSite.html",
				controller: "AddSiteController",
				resolve: {
					sites: function(){
						return $scope.sites;
					}
				}
			};
		angular.extend(modalOptions, $rootScope.defaultModalOptions);
		var modalInstance = $uibModal.open(modalOptions);
		$rootScope.getModalCloseFunctions(modalInstance, "site", true, $scope.getSites);
	};
	
});

