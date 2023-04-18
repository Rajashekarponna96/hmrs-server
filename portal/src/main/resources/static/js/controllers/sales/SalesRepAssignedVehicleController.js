angular
		.module('srmt')
		.controller(
				"SalesRepAssignedVehicleController",
				function($scope, $state, $stateParams, vehicleTypeService,
						LocationService, personalService, $localStorage,
						toaster, employeeService, salesRepresentataiveService,
						productLineService, vehicleCategoryService) {

					$scope.getAllProductLines = function() {
						productLineService.getAllProductLines().then(
								function(response) {
									$scope.productLinesList = response.data;
								})
					}

					$scope.getLocationsBySalesRepId = function(
							salesRepresentativeId) {
						salesRepresentataiveService.getLocationsBySalesRepId(
								salesRepresentativeId).then(function(response) {
							$scope.locations = response.data;
							console.error("hello world:: " + $scope.Locations);
						})
					}
					$scope.getAlltLocations = function() {
						LocationService.getAlltLocations().then(
								function(response) {
									$scope.locationList = response.data;
								})
					}

					$scope.gotoSalesRepAssignedVehicles = function() {

						$state.go('home.tdv.SalesRepAssignedVehicleList');
					}
					$scope.gotoAddSalesRepAssignedVehicles = function() {
						$state.go('home.tdv.addSalesRepAssignedVehicle');
					}

					$scope.employee = $stateParams.salesRepresentative;
					console.log($scope.employee);

					$scope.getLocationsAndVehicleModelsById = function() {
						employeeService
								.getLocationsAndVehicleModelsById(
										$scope.employee.id)
								.then(
										function(response) {
											$scope.locationsAndModels = response.data;
											$scope.productLines = $scope.locationsAndModels.productLines;
											$scope.locations = $scope.locationsAndModels.locations;

											console
													.log($scope.locationsAndModels);
										})
					}
					if ($scope.employee != undefined) {
						$scope.getLocationsAndVehicleModelsById();
						$scope.getAlltLocations();
					}
					console.log($scope.employee);
					$scope.gotoUpdateSalesRepAssignedVehicles = function(
							salesRepresentative) {
						$state.go('home.tdv.updateSalesRepAssignedVehicle', {
							salesRepresentative : salesRepresentative
						});
					}
					$scope.gotoViewSalesRepAssignedVehicles = function(
							salesRepresentative) {
						$state.go('home.tdv.viewSalesRepAssignedVehicle', {
							salesRepresentative : salesRepresentative
						});
					}

					$scope.init = function() {
						$scope.getAllProductLines();
						$scope.getVehicleCategories();
						$scope.getAlltLocations()
					}
					$scope.init2 = function() {
						$scope.getAlltLocations();

					}

					$scope.getVehicleModelsByCategory = function(categoryId) {
						vehicleCategoryService.getVehicleModelsByCategory(
								categoryId).then(function(response) {
							$scope.vehicleModelsList = response.data;
						})
					}

					$scope.getVehicleCategories = function() {
						vehicleCategoryService.getVehicleCategories().then(
								function(response) {
									$scope.categoryList = response.data;
								})
					}

					$scope.getAllSalesRepresentatives = function() {
						employeeService
								.getAllSalesRepresentatives()
								.then(
										function(response) {
											$scope.salesRepresentativeList = response.data;
										})
					}

					$scope.updatePerson = function(person) {
						person.productLines = $scope.productLines;
						personalService.updatePersonForSalesRepLocations(
								person.id, person).then(function(response) {
							toaster.success({
								body : 'Added Successfully',
								showCloseButton : true,
								timeout : 4000
							});
							$scope.gotoSalesRepAssignedVehicles();
							personalService.setEmployeee(response.data);
							console.log(personalService.getEmployee());

						}, function(error) {
							toaster.pop({
								type : 'error',
								body : error.data.message,
								showCloseButton : true,
								timeout : 4000
							});
						})

					}
					$scope.updateSalesRepAssignedVehicel = function(person) {
						person.productLines = $scope.productLines;
						person.locations = $scope.locations;
						personalService.updatePersonForSalesRepLocations(
								person.id, person).then(function(response) {
							toaster.success({
								body : 'Updated Successfully',
								showCloseButton : true,
								timeout : 4000
							});
							$scope.gotoSalesRepAssignedVehicles();
							personalService.setEmployeee(response.data);
							console.log(personalService.getEmployee());

						}, function(error) {
							toaster.pop({
								type : 'error',
								body : error.data.message,
								showCloseButton : true,
								timeout : 4000
							});
						})

					}

					$scope.size = 10;
					$scope.page = 0;
					/**
					 * pagination logic
					 * 
					 * need to count total page in count menthos need to call
					 * count() in data list method.
					 * 
					 * need to call data list methis in $scope.$watchGroup([
					 * 'page', 'size' ]
					 * 
					 * need to take care about sno neeed to check recods for
					 * page need to check totla records
					 */

					$scope.prevPage = function() {
						if ($scope.page > 0) {
							$scope.page--;
						}
					};

					$scope.prevPageDisabled = function() {
						return $scope.page === 0 ? "disabled" : "";
					};

					$scope.nextPage = function() {
						if ($scope.page < $scope.totalPages - 1) {
							$scope.page++;
						}
					};

					$scope.nextPageDisabled = function() {
						return $scope.page === $scope.totalPages - 1 ? "disabled"
								: "";
					};

					$scope.firstPage = function() {
						$scope.page = 0;
					};
					$scope.lastPage = function() {
						$scope.page = $scope.totalPages - 1;

					};
					$scope.recordsPerPage = function() {
						$scope.page = 0;
						$scope.size = $scope.PerPage;
					}

					$scope.$watchGroup([ 'page', 'size' ], function(newVal,
							oldVal) {
						$scope.searchSalesRepresntative();
					});

					$scope.getCount = function(url) {
						salesRepresentataiveService.getCount(url).then(
								function(response) {
									$scope.count = response.data;
									$scope.totalPages = Math.ceil($scope.count
											/ $scope.size);
								});
					};

					/**
					 * pagination logic
					 */

					$scope.searchSalesRepresntative = function() {
						var url = "?"
						if ($scope.salesRepCode != undefined) {
							url = url + "salesRepCode=" + $scope.salesRepCode
									+ "&";
						}
						if ($scope.mobile != undefined) {
							url = url + "mobile=" + $scope.mobile;
						}
						var countUrl = url;
						countUrl = countUrl.substr(countUrl,
								countUrl.length - 1);
						url = url + "&page=" + $scope.page + "&size="
								+ $scope.size;
						salesRepresentataiveService.searchSalesRepresntative(
								url).then(function(response) {
							$scope.salesRepresentativeList = response.data;
							$scope.getCount(countUrl);
						})
					};

					$scope.productLines = [];
					$scope.addProductLine = function(productLine) {
						$scope.flag = false;
						console.log(productLine);
						angular.forEach($scope.productLines, function(
								productLineObj) {
							if (productLineObj.number == productLine.number) {
								toaster.pop({
									type : 'error',
									body : "Duplicate Entry for model",
									showCloseButton : true,
									timeout : 4000
								});
								$scope.flag = true;
							}
						})
						if ($scope.flag == false) {
							$scope.productLines.push(angular.copy(productLine));
							$scope.productLine = {};
						}

					}
					$scope.deleteProductLine = function($index) {
						$scope.productLines.splice($index, 1);
					}

					$scope.deleteProductLineForUpdate = function(index) {
						$scope.productLines.splice(index, 1);
					}

					$scope.addProductLineForUpdate = function(productLine) {
						$scope.flag = false;
						angular.forEach($scope.productLines,
								function(modelObj) {
									if (modelObj.number == productLine.number) {
										toaster.pop({
											type : 'error',
											body : "Duplicate Entry for model",
											showCloseButton : true,
											timeout : 4000
										});
										$scope.flag = true;
									}
								})
						if ($scope.flag == false) {
							$scope.productLines.push(angular.copy(productLine));
							$scope.productLine = {};
						}

					}

				})