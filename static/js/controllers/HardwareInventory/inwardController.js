angular.module('srmt').controller(
		"inwardController",
		function($scope, $state, stationService, $stateParams,
				$localStorage, toaster) {

			$scope.gotoInwardsList = function() {
				$state.go('home.inward.inwardList');
			}

			$scope.gotoAddInward = function() {
				$state.go('home.inward.addInward');
			}
			$scope.stationDetail = $stateParams.station;
			console.log("Station Details "+$scope.stationDetail)
			$scope.gotoUpadeStationList = function(station) {
				$state.go('home.station.updateStation', {
					station : station
				});
			}

			$scope.gotoViewStations= function(station) {
				$state.go('home.station.viewStation', {
					station : station
				});
			}

			$scope.getControls = function() {
				controlService.getControls().then(function(response) {
					$scope.controlsList = response.data;
				})
			}

			$scope.addStation = function(station, control) {

				stationService.addStation(control.id, station).then(
						function(response) {

							toaster.success({

								body : 'Added Successfully',
								showCloseButton : true,
								timeout : 4000
							});

							$scope.gotoStationsList();
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

			$scope.updateStation = function(station) {
				console.log("$scope.updateStation "+station);
				console.log("contId "+$scope.stationDetail.control.id);
				console.log("stationId "+station.id);
				stationService.updateStation($scope.stationDetail.control.id,
						station.id, station).then(function(response) {

					toaster.success({

						body : 'Updated Successfully',
						showCloseButton : true,
						timeout : 5000
					});
					$scope.gotoStationsList();
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
			$scope.recordsPerPage = function(PerPage) {
				$scope.page = 0;
				$scope.size = PerPage;
			}

			$scope.$watchGroup([ 'page', 'size' ], function(newVal, oldVal) {
				$scope.searchStations();
			});

			$scope.getCount = function(CountUrl) {
				stationService.getCount(CountUrl).then(function(response) {
					$scope.count = response.data;
					$scope.totalPages = Math.ceil($scope.count / $scope.size);
				});
			};

			/**
			 * pagination logic
			 */

			$scope.searchStations = function(control) {
				var url = "?";
				console.log("Control"+control);
				if (control != undefined && control != "" &&control != null) {
					url = url + "controlId=" + control.id + "&";
				}

				var CountUrl = url;
				CountUrl = CountUrl.substr(0, CountUrl.length - 1);
				url = url + "page=" + $scope.page + "&size=" + $scope.size;

				stationService.searchStations(url).then(function(response) {
					$scope.stationslist = response.data;
					$scope.getCount(CountUrl);

				})
			}
			$scope.resetInward = function(){
				$scope.inwardDate = '';
			}

		})