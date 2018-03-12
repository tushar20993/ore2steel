portal.controller("BrandController", function($scope, $rootScope, $http, $uibModal){
	$scope.getBrands = function(){
		$http.get("/brand/getAll").then(
				function(response){
					$scope.brands = response.data;
					$scope.gridOptions = {
							exporterMenuCsv: true,
							enableGridMenu: true,
							enableFiltering : true,
							enableColumnResizing: true,
							enableRowReordering: true,
							rowHeight: 40,
							enableSorting: true,
							data: $scope.brands,
							columnDefs: [
								{name: "brandId", 				visible: true, displayName: "Brand ID"},
								{name: "brandName", 			visible: true, displayName: "Brand Name"},
								{name: "Actions", 
									cellTemplate: 
										'<div class="ui-grid-cell-contents row">' + 

										'<button type = "button" class = "btn btn-sm btn-info col-md-4 offset-md-1" ' + 
											'ng-click = "grid.appScope.editBrand(row.entity)" >' + 
											'<span class="material-icons">mode_edit</span>'+ 
										'</button>' +
										
										'<button type = "button" class = "btn btn-sm btn-danger col-md-4 offset-md-1" ' + 
													'ng-click = "grid.appScope.deleteBrand(row.entity)" >' + 
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
	
	$scope.getBrands();
	
	$scope.editBrand = function(brand){
		var modalInstance = $uibModal.open({
			animation: false,
			templateUrl: "partials/brand/editBrand.html",
			backdrop: "static",
			keyboard: false,
			size: "lg",
			controller: "EditBrandController",
			resolve: {
				brand: function(){
					return JSON.parse(JSON.stringify(brand));
				}
			}
		});
		
		modalInstance.result.then(function(data){
			if(data.status == 1){
				$scope.getBrands();
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
	
	$scope.addBrand = function(){
		var modalInstance = $uibModal.open({
			animation: false,
			templateUrl: "partials/brand/addBrand.html",
			backdrop: "static",
			keyboard: false,
			size: "lg",
			controller: "AddBrandController",
			resolve: {
				brands: function(){
					return $scope.brands;
				}
			}
		});
		
		modalInstance.result.then(function(data){
			if(data.status == 1){
				$scope.getBrands();
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