angular.module('srmt').controller(
		"stateController",
		function($scope, $state, stateService, $stateParams, countryService,
				$localStorage, toaster) {

			$scope.gotoStatesList = function() {
				$state.go('home.state.stateList');
			}

			$scope.gotoAddStatesList = function() {
				$state.go('home.state.addState');
			}
			$scope.stateDetail = $stateParams.state;
			$scope.gotoUpadeStatesList = function(state) {
				$state.go('home.state.updateState', {
					state : state
				});
			}

			$scope.gotoViewState = function(state) {
				$state.go('home.state.viewState', {
					state : state
				});
			}

			$scope.getCountries = function() {
				countryService.getCountries().then(function(response) {
					$scope.countriesList = response.data;
				})
			}

			$scope.addState = function(state, country) {

				stateService.addState(country.id, state).then(
						function(response) {

							toaster.success({

								body : 'Added Successfully',
								showCloseButton : true,
								timeout : 4000
							});

							$scope.gotoStatesList();
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

			$scope.updateState = function(state) {

				stateService.updateState($scope.stateDetail.country.id,
						state.id, state).then(function(response) {

					toaster.success({

						body : 'Updated Successfully',
						showCloseButton : true,
						timeout : 5000
					});
					$scope.gotoStatesList();
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
				$scope.searchStates();
			});

			$scope.getCount = function(CountUrl) {
				stateService.getCount(CountUrl).then(function(response) {
					$scope.count = response.data;
					$scope.totalPages = Math.ceil($scope.count / $scope.size);
				});
			};

			/**
			 * pagination logic
			 */

			$scope.searchStates = function(country) {
				var url = "?";
				console.log(country);
				if (country != undefined && country != "" && country != null) {
					url = url + "countryId=" + country.id + "&";
				}

				var CountUrl = url;
				CountUrl = CountUrl.substr(0, CountUrl.length - 1);
				url = url + "page=" + $scope.page + "&size=" + $scope.size;

				stateService.searchStates(url).then(function(response) {
					$scope.stateslist = response.data;
					$scope.getCount(CountUrl);

				})
			}

		})