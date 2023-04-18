angular.module('srmt').controller(
		"vehiclemodelColorController",
		function($scope, $state, $stateParams, vehicleColorService,
				$localStorage, toaster) {
			$scope.gotoAddProductLIne = function() {
				$state.go("home.tdv.productLine.productLineDetail");
			};

			$scope.getVehicleColors = function() {
				vehicleColorService.getVehicleColors().then(function(response) {
					$scope.colorList = response.data;
				})
			}

			$scope.addVehicleColor = function(vehicleColor) {
				vehicleColorService.addVehicleColor(vehicleColor).then(
						function(response) {
							toaster.success({
								body : 'Vehicle Type Added Successfully',
								showCloseButton : true,
								timeout : 4000
							});

							$scope.gotoAddProductLIne();
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

			$scope.updateVehicleColor = function(vehicleColor) {
				vehicleColorService.updateVehicleColor(vehicleColor.id,
						vehicleColor).then(function(response) {
					toaster.success({
						body : 'Vehicle Color Updated Successfully',
						showCloseButton : true,
						timeout : 4000
					});
					$scope.getVehicleColors();
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

			$scope.init = function() {
				$scope.getVehicleColors();
			};

			$scope.editColor = function(color, index) {
				$scope.index1 = index;
				$scope.vehicleModelColor = color;
			}

		})