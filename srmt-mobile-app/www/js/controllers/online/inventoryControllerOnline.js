angular
		.module('srmt')
		.controller(
				"inventoryControllerOnline",
				function($scope, onlineInventoryService,
						inventoryServiceOffline, vehicleModelServiceOffline,
						locationServiceOffline, $state, $localStorage) {

					$scope.goBack = function() {
						$state.go('app.dashboard');
					};

					$scope.goToInventoryList = function() {
						$state.go('app.inventory');
					};

					$scope.getLocationsAndVehicleModelsByEmployeeId = function() {
						onlineInventoryService
								.getLocationsAndVehicleModelsByEmployeeId(
										$localStorage.loginId)
								.then(
										function(response) {
											$scope.productLines = response.data.productLines;
											$scope.locations = response.data.locations;

											inventoryServiceOffline
													.deleteDb()
													.then(
															function(success) {
																inventoryServiceOffline
																		.bulkPost($scope.vehicleModels);
															});
											vehicleModelServiceOffline
													.deleteDb()
													.then(
															function(success) {
																vehicleModelServiceOffline
																		.bulkPost($scope.vehicleModels);
															});
											locationServiceOffline
													.deleteDb()
													.then(
															function(success) {
																locationServiceOffline
																		.bulkPost($scope.vehicleModels);
															});

										});
					};
					$scope.getEmployeeLocationAndVehicleModelList = function() {
						if ($cordovaNetwork != undefined
								&& $cordovaNetwork.isOffline()) {
							$scope.doLoginServiceAsoffline();

						} else {
							inventoryServiceOffline
									.getAllDocs()
									.then(
											function(response) {
												if (response.rows.length > 0) {
													$scope.vehicleModels = response.rows;
												}
											});
						}
					};

				})