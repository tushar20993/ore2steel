portal.controller("BrandController", function($scope, $rootScope, $http, $uibModal, Notification, GlobalSpinner){
	$scope.gridOptions = {};
	$scope.getBrands = function(){
		return $http.get("/brand/getAll").then(
				function success(response){
					$scope.brands = response.data;
					$scope.gridOptions = {
							data: $rootScope.brands,
							columnDefs: [
								{name: "brandId", 				visible: true, displayName: "Brand ID"},
								{name: "brandName", 			visible: true, displayName: "Brand Name"},
								{name: "brandGroup", 			visible: true, displayName: "Brand Group"},
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
					angular.extend($scope.gridOptions, $rootScope.defaultGridOptions);
					GlobalSpinner.hide();
				},
				function(response){
					Notification.error("Failed to fetch all brands");
				});		
	};

	GlobalSpinner.show();
	$scope.getBrands();

	$scope.editBrand = function(brand){
		var modalOptions = {
				templateUrl: "partials/brand/editBrand.html",
				controller: "EditBrandController",
				resolve: {
					brand: function(){
						return JSON.parse(JSON.stringify(brand));
					}
				}
			}
		angular.extend(modalOptions, $rootScope.defaultModalOptions);
		var modalInstance = $uibModal.open(modalOptions);
		$rootScope.getModalCloseFunctions(modalInstance, "brand", false, $scope.getBrands);
	};
	
	$scope.addBrand = function(){
		var modalOptions = {
				templateUrl: "partials/brand/addBrand.html",
				controller: "AddBrandController",
				resolve: {
					brands: function(){
						return $scope.brands;
					}
				}
		};
		angular.extend(modalOptions, $rootScope.defaultModalOptions);
		var modalInstance = $uibModal.open(modalOptions);
		$rootScope.getModalCloseFunctions(modalInstance, "brand", true, $scope.getBrands);
	};
});