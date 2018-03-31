portal.controller("EditInvoiceController", function($scope, $rootScope, $http, $uibModalInstance, Notification, invoice, GlobalSpinner, $window){
	$scope.invoice = invoice;
	$scope.invoice.invoiceDate = new Date($scope.invoice.invoiceDate);
	$scope.invoice.invoiceStatusDate = new Date($scope.invoice.invoiceStatusDate);
	$scope.invoice.company = $scope.invoice.site.siteId.company;
	
	
	$http.get("/company/getAll").then(
			function success(response){
				$scope.companies = response.data;
			}, function fail(response){
				Notification.error("Failed to get companies. Please try again later!")
			});
	
	
	
	$scope.getItems = function(){
		return $http.post("/invoice_item/getFor", $scope.invoice).then(
				function success(response){
					$scope.invoice.items = response.data;
				}, function error(response){
					Notification.error("Couldn't fetch items for the invoice. Please refresh.")
				});
		
	};
	$scope.getItems();


	$scope.onCompanySelect = function(){
		$scope.sites = [];
		var company = $scope.invoice.company;
		if(company == undefined){
			return;
		}
		$http.get("/site/get?id=" + company.companyId).then(
				function success(response){
					$scope.sites = response.data;
				},
				function fail(response){
					Notification.error("Error in getting sites for " + company.companyName);
				});
	};
	
	$scope.onCompanySelect();
	
	$scope.onSiteSelect = function(){
		$scope.purchaseOrders = [];
		var site = $scope.invoice.site;
		if(site == undefined){
			return;
		}
		$http.post("/purchase_order/getBySite", site).then(
				function success(response){
					$scope.purchaseOrders = response.data;
				},
				function fail(response){
					Notification.error("Error in getting POs for " + site.siteName);
				});
	};
	
	$scope.onSiteSelect();
	
	$scope.onInvoiceTypeaheadSelect = function(){
		Notification.error("This invoice number already exists. Please try different Invoice Number");
		$scope.invoice.invoiceNumber = '';
	}
	
	$http.get("/transporter/getAll").then(
			function success(response){
				$scope.transporters = response.data;
			}, function fail(response){
				Notification.error("Failed to get transporters. Please try again later!")
			});
	
	
	$http.get("/vehicle/getAll").then(
			function success(response){
				$scope.vehicles = response.data;
			}, function fail(response){
				Notification.error("Failed to get vehicles. Please try again later!")
			});
	
	$http.get("/invoice_status/getAll").then(
			function success(response){
				$scope.invoiceStatuses = response.data;
			},
			function fail(response){
				Notification.error("Failed to get invoice status types. Please try again later!");
			});	
	
		
	$scope.close = function(){
		$uibModalInstance.dismiss("cancel");
	};
	
	$scope.addItem = function(){
		var newItem = {};
		newItem.isNew = true;
		newItem.price = 0;
		newItem.quantity = 0;
		newItem.amount = 0;
		$scope.invoice.items.push(newItem);
	}
	
	$scope.deleteItem = function(index){
		var item = $scope.invoice.items[index];
		if(item.isNew){
			$scope.invoice.items.splice(index, 1);
			return;
		}
		
		var confirm = $window.confirm("Are you sure you want to delete " + item.item.itemName + "?")
		if(!confirm){
			return;
		}
		GlobalSpinner.show();
		$http.post("/invoice_item/delete", item).then(
				function success(response){
					Notification.success("Successfully deleted " + item.item.itemName);
					GlobalSpinner.hide();
					$scope.invoice.items.splice(index, 1)
				}, function error(response){
					Notification.error("Failed to delete the item. Error: " + response.data);
					GlobalSpinner.hide();
				});
	
		
	}
	
	$scope.saveInvoice = function(){
		var invoice = JSON.parse(JSON.stringify($scope.invoice))
		
		if(invoice.dispatchDetail){
			if(invoice.dispatchDetail.transporter && !invoice.dispatchDetail.transporter.transporterId){
				var temp = invoice.dispatchDetailk;
				invoice.dispatchDetail.transporter = {}
				invoice.dispatchDetail.transporter.transporterName = temp;
			}
			if(invoice.dispatchDetail.vehicle && !invoice.dispatchDetail.vehicle.vehicleNumber){
				var temp = invoice.dispatchDetail.vehicle;
				invoice.dispatchDetail.vehicle = {}
				invoice.dispatchDetail.vehicle.vehicleNumber = temp;
			}
		}
		
		$http.post( "/invoice/update", invoice)
		.then(
				function success(response){
					$uibModalInstance.close("success");
				}, function error(response){
					$uibModalInstance.dismiss("fail");
				}
			);
	}
	
	$scope.getTotalAmount = function(){
		var total = 0.0;
		angular.forEach($scope.invoice.items, function(invoiceItem){
			total = total + invoiceItem.amount;
		})
		return total;
	};
	
	$scope.getTotalQuantity = function(){
		var total = 0.0;
		angular.forEach($scope.invoice.items, function(invoiceItem){
			if(!invoiceItem.item || invoiceItem.item == undefined){
				return;
			}
			if(invoiceItem.item.itemGroup == "Item" || invoiceItem.item.itemGroup == "Sales Item"){
				total = total + invoiceItem.quantity;
			}
		})
		return total;
	}
	
	$scope.getBasicAmount = function(){
		var total = 0;
		for(var i = 0 ; i < $scope.invoice.items.length; i ++){
			var invoiceItem = $scope.invoice.items[i];
			if((invoiceItem.item != undefined) && invoiceItem.item.itemGroup != "Rates & Taxes"){
				invoiceItem = JSON.parse(JSON.stringify(invoiceItem))
				total = total + invoiceItem.amount;
			}
		}
		return total;
	}
	
	
	$scope.$watch('invoice.items', function(newVal, oldVal){
		var items = newVal;
		if(!items){
			return;
		}
		for(var i = 0; i < items.length; i ++){
			var invoiceItem = items[i];
			if(invoiceItem.item == undefined){
				continue;
			}
			
			
			if (invoiceItem.item.itemGroup == "Rates & Taxes"){
				var basicTotal = $scope.getBasicAmount();
				invoiceItem.unitOfMeasurement = "%";
				invoiceItem.amount = (invoiceItem.quantity / 100) * basicTotal;
			}
			
			else if(invoiceItem.item.itemGroup == "Others"){
				invoiceItem.amount = invoiceItem.price * $scope.getTotalQuantity();
			}
	
			else if( (invoiceItem.item.itemGroup == "Sales Item") || (invoiceItem.item.itemGroup == "Item") ){
				invoiceItem.amount = invoiceItem.price * invoiceItem.quantity;
			}
			
		}
	}, true)
	
	
});