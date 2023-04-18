angular.module('srmt').controller(
		"showroomController",
		function($scope, $state, personalService, LocationService,
				$stateParams, showroomService, $localStorage, toaster) {

			$scope.gotoShowroomList = function() {
				$state.go('home.showroom.showroomlist');
			}

			$scope.gotoAddShowroom = function() {
				$state.go('home.showroom.addShowroom');
			}

			$scope.showroomDetail = $stateParams.showroom;

			$scope.gotoUpadeShowroom = function(showroom) {
				console.log($scope.showroomDetail);
				$state.go('home.showroom.updateShowroom', {
					showroom : showroom
				});
			}

			$scope.gotoViewShowroom = function(showroom) {
				$state.go('home.showroom.viewShowroom', {
					showroom : showroom
				});
			}

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
				$scope.searchShowroomsByCodeAndLocation();
			});

			$scope.getCount = function(countUrl) {
				showroomService.getCount(countUrl).then(function(response) {
					$scope.count = response.data;
					
				});
			};

			/**
			 * pagination logic
			 */

			
			$scope.addShowroom = function(showroom) {
				console.log("add showroom clicked");
				showroomService.addShowroom(showroom).then(function(response) {
					toaster.success({

						body : 'Showroom Added Successfully.',
						showCloseButton : true,
						timeout : 4000
					});

					$scope.gotoShowroomList();
				},

				function(error) {
					toaster.pop({
						type : 'error',
						body : error.data.message,
						showCloseButton : true,
						timeout : 4000
					});
				})
			}

			$scope.updateShowroom = function(showroom) {
				showroomService.updateShowroom(showroom.id, showroom).then(
						function(response) {
							toaster.success({

								body : 'Showroom updated successfully.',
								showCloseButton : true,
								timeout : 4000
							});

							$scope.gotoShowroomList();
						},

						function(error) {
							toaster.pop({
								type : 'error',
								body : error.data.message,
								showCloseButton : true,
								timeout : 4000
							});
						})
			}

			$scope.init = function() {
				$scope.getAllEmployees();
				$scope.getAllLocations();
			}

			$scope.getAllEmployees = function() {
				personalService.getAllActiveEmployees().then(
						function(response) {
							$scope.employeeList = response.data;

						})
			};

			$scope.getAllLocations = function() {
				LocationService.getAlltLocations().then(function(response) {
					$scope.locationList = response.data;
				})
			};

			$scope.searchShowroomsByCodeAndLocation = function(code, location) {
				var url = "?";
				if (code != undefined && code != "") {
					url = url + "showroomCode=" + code + "&";
				}
				if (location != undefined && location != "") {
					url = url + "locationId=" + location.id + "&";
				}
				var countUrl = url;
				countUrl = countUrl.substr(0, countUrl.length - 1);
				url = url + "page=" + $scope.page + "&size=" + $scope.size;
				showroomService.searchShowroomsByCodeAndLocation(url).then(
						function(response) {
							$scope.showroomList = response.data;
							$scope.getCount(countUrl);
						});

			};

		})