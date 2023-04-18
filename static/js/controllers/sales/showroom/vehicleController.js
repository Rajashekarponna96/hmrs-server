angular.module('srmt').controller(
		"vehicleController",
		function($scope, $state, vehicleTypeService, $stateParams,
				vehicleCategoryService, $localStorage, vehicleService,
				vehicleColorService, toaster) {
			$scope.vehicleData = $stateParams.vehicle;
			$scope.gotoVehicleList = function() {
				$state.go('home.vehicle.vehiclelist');
			}

			$scope.gotoAddVehicle = function() {
				$state.go('home.tdv.lookup.segment');
			}

			$scope.colors = [];
			$scope.gotoUpadeVehicle = function(vehicle) {
				$state.go('home.vehicle.updateVehicle', {
					vehicle : vehicle
				});

			}

			$scope.gotoViewVehicle = function(vehicle) {
				$state.go('home.vehicle.viewVehicle', {
					vehicle : vehicle
				});
			};

			$scope.PerPage = 10;
			$scope.size = 10;
			$scope.page = 0;
			/**
			 * pagination logic
			 * 
			 * need to count total page in count menthos need to call count() in
			 * data list method.
			 * 
			 * need to call data list methis in $scope.$watchGroup([ 'page',
			 * 'size' ]
			 * 
			 * need to take care about sno neeed to check recods for page need
			 * to check totla records
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
				return $scope.page === $scope.totalPages - 1 ? "disabled" : "";
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

			$scope.$watchGroup([ 'page', 'size' ], function(newVal, oldVal) {
//				$scope.SearchVehicle();
			});

			$scope.getCount = function(countUrl) {
				vehicleService.getCount(countUrl).then(function(response) {
					$scope.count = response.data;
					$scope.totalPages = Math.ceil($scope.count / $scope.size);
				});
			};

			/**
			 * pagination logic
			 */

			$scope.init = function() {
				$scope.getColors();
				$scope.getVehicleCategories();
			};
			$scope.colors = [];

			$scope.getColors = function() {
				vehicleColorService.getVehicleColors().then(function(response) {
					$scope.colorList = response.data;
					angular.forEach($scope.colorList, function(color) {
						$scope.colors.push(color.name);
					})
				})
			}

			/*
			 * $scope.getVehicleList = function(){
			 * vehicleService.getVehicleList($scope.page,
			 * $scope.size).then(function(response){ $scope.vehicleList =
			 * response.data; $scope.getCount(); }) };
			 */

			$scope.getVehicleCategories = function() {
				vehicleService.getVehicleCategories().then(function(response) {
					$scope.vehicleCategoryList = response.data;
				})
			};
			var colors = [];
			var i = 0;
			$scope.addVehicle = function(vehicle) {
				vehicleService.addVehicle(vehicle).then(function(response) {
					toaster.success({
						body : 'Added Successfully',
						showCloseButton : true,
						timeout : 4000
					});

					$scope.gotoVehicleList();
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

			var vehicle1 = {};
			$scope.updateVehicleModel = function(vehicleModel) {
				vehicle1 = {
					code : vehicleModel.code,
					name : vehicleModel.name,
					colors : vehicleModel.colors,
					vehicleCategory : vehicleModel.vehicleCategory
				}
				vehicleService
						.updateVehicleModel(vehicleModel.id, vehicleModel)
						.then(function(response) {
							toaster.success({

								body : 'Updated Successfully',
								showCloseButton : true,
								timeout : 4000
							});
							$scope.gotoVehicleList();
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

			$scope.SearchVehicle = function(vehicleCategory) {
				var url = "?"
				if ($scope.code != undefined) {
					url = url + "vehicleCode=" + $scope.code + "&";
				}
				if (vehicleCategory != undefined) {
					url = url + "vehicleCategoryId=" + vehicleCategory.id + "&";
				}

				var countUrl = url;
				countUrl = countUrl.substr(0, countUrl.length - 1);
				var dataUrl = url + "page=" + $scope.page + "&size="
						+ $scope.size;
				vehicleService.SearchVehicle(dataUrl).then(function(response) {
					$scope.vehicleModelList = response.data;
					$scope.getCount(countUrl);
				})
			};
			var colorlist = "";
			$scope.getVehicleModelList = function() {
				vehicleService.getVehicleModelList($scope.page, $scope.size)
						.then(function(response) {
							$scope.vehicleModelList = response.data;
							$scope.getCount();
						})
			};
			
			$scope.data = [{
				"id":1,
				"title":"hello",
				"nodes":[{
					"id":11,
					"title": "hai there",
					"nodes":[]
				},
				{
					"id":11,
					"title": "hai there",
					"nodes":[]
				},
				{
					"id":11,
					"title": "asefsdf there",
					"nodes":[]
				}
				]
		}];

		})