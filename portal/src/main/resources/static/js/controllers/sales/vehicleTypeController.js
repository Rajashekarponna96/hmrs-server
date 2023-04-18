angular.module('srmt').controller(
		"vehicleTypeController",
		function($scope, $state, $stateParams, vehicleTypeService,
				$localStorage, toaster) {
			$scope.addVehicleType = function(vehicleType) {
				vehicleTypeService.addVehicleType(vehicleType).then(
						function(response) {
							toaster.success({
								body : 'Vehicle Type Added Successfully',
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
			
		})