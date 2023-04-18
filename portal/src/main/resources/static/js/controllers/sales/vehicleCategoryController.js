angular.module('srmt').controller(
		"vehicleCategoryController",
		function($scope, $state, vehicleCategoryService, $stateParams,
				vehicleTypeService, $localStorage, toaster) {

			$scope.gotoVehicleCategory = function() {
				$state.go('home.vehicle.vehicleCategoryList');
			}

			$scope.gotoAddVehicle = function() {
				$state.go('home.vehicle.addVehicle');
			};

			$scope.gotoAddVehicleCategory = function() {
				$state.go('home.vehicle.addvehicleCategory');
			};
			$scope.gotoVehicleList = function() {
				$state.go('home.vehicle.vehicleList');
			};

			$scope.init = function() {
				$scope.getVehicleTypes();
			}

			$scope.getVehicleCategories = function() {
				vehicleCategoryService.getVehicleCategories().then(
						function(response) {
							$scope.vehicleCategoryList = response.data;
						});
			};

			$scope.addVehicleCategory = function(vehicleCategory) {
				vehicleCategoryService.addVehicleCategory(vehicleCategory)
						.then(function(response) {
							toaster.success({
								body : 'Added Successfully',
								showCloseButton : true,
								timeout : 4000
							});
							$scope.gotoAddVehicle();
						},

						function(error) {
							toaster.pop({
								type : 'error',
								body : error.data.message,
								showCloseButton : true,
								timeout : 4000
							});
						})
			};
			
			$scope.updateVehicleCategory = function(vehicleCategory) {
				vehicleCategoryService.updateVehicleCategory(vehicleCategory.id, vehicleCategory)
						.then(function(response) {
							toaster.success({
								body : 'Updated Successfully',
								showCloseButton : true,
								timeout : 4000
							});
							$scope.gotoAddVehicle();
						},

						function(error) {
							toaster.pop({
								type : 'error',
								body : error.data.message,
								showCloseButton : true,
								timeout : 4000
							});
						})
			};
			
			$scope.editVehicelCategory= function(category, index) {
				$scope.index1 = 1;
				$scope.vehicleCategory = category;
			};

		})