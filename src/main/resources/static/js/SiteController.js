portal.controller("SiteController", function($scope, $rootScope, $http, $uibModal){
	console.log("Site Controller");
	
	
	$scope.getSites = function(){
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
							enableSorting: true,
							columnDefs: [
								{name: "companyName", 			visible: true, cellTemplate: '<div class="ui-grid-cell-contents wrap no-overflow" white-space: normal>{{row.entity.siteId.companyName}}</div>'},
								{name: "siteName", 				visible: true, },
								{name: "siteAddress", 			visible: true, },
								{name: "stateCode", 			visible: true, cellTemplate: '<div class="ui-grid-cell-contents wrap no-overflow" white-space: normal>{{row.entity.stateCode.stateName}}</div>', displayName: "State", field: "stateCode.stateName"},
								{name: "pinCode", 				visible: true, displayName: "PIN Code"},
								{name: "contactPerson", 		visible: true, },
								{name: "gstNumber", 			visible: true, },
								{name: "contactPerson", 		visible: true, },
								{name: "contactNumber", 		visible: true, },
							]
						};
				},
				function(response){
					console.log("ERROR", response);
				});		
	};
	
	$scope.getSites();
	
	
	
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
			if(data == "success"){
				$scope.getSites();
				$scope.alerts.push({msg: "Successfully added the new site", type: data});
			}
			else if(data == "danger"){
				$scope.alerts.push({msg: "Failed to add. Try again later.", type: data});
			}
			else{
				$rootScope.addAlert(data.msg, data.type);
			}
		});
	};
	
});

portal.controller("AddSiteController", function($scope, $rootScope, $http, $uibModalInstance, sites){
	$scope.site = {};
	$scope.sites = sites;
	$scope.statuses = [];
	
	$http.get("/company/getAll").then(
			function success(response){
				$scope.companies = response.data;
			}, function fail(response){
				alert("error in getting companies");
			});
	
	$scope.stateCodes = [];
	$http.get("/state_code/getAll").then(
			function(response){
				$scope.stateCodes = response.data;
				console.log($scope.stateCodes )
			},
			function(response){
				console.error(response.data);
			});
	
	
	
	$http.get("/status/getAll").then(
			function(response){
				$scope.statuses = response.data;
			},
			function(response){
				console.error(response.data);
			});

	
	$scope.close = function(){
		$uibModalInstance.close({status: 2, msg: "You closed the window"});
	};
	
	$scope.saveSite = function(){
		console.log($scope.site);
		
		$http({
			method: "POST",
			url: "/site/save",
			data: JSON.parse(JSON.stringify($scope.site)),
			headers: {"Content-Type": "application/json; charset=utf8"}
		}).then(function success(response){
			$uibModalInstance.close({status: 1, msg: "Successfully saved company!"});
		}, function error(response){
			$uibModalInstance.close({status: 0, msg: "Failed to save company!"});
		});
	}
	
});