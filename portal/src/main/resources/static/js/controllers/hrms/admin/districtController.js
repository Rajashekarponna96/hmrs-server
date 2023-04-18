angular.module('srmt').controller(
		"districtController",
		function($scope, $state, districtService, $stateParams, countryService,
				stateService, $localStorage, toaster) {

			$scope.gotoDistrictList = function() {
				$state.go('home.districtList');
			}

			$scope.gotoAddDistrictList = function() {
				$state.go('home.addDistrict');
			}

			$scope.districtDetail = $stateParams.district;
			console.log($scope.districtDetail);
			
			
			$scope.gotoUpadeDistrictList = function(district) {
				$state.go('home.updateDistrict', {
					district : district
				});
			}

			$scope.gotoViewDistrict = function(district) {
				$state.go('home.viewdistrict', {
					district : district
				});
			}

			$scope.getCountries = function() {
				countryService.getCountries().then(function(response) {
					$scope.countriesList = response.data;
				})
			}

			$scope.getStates = function(countryId) {
				stateService.getStates(countryId).then(function(response) {
					$scope.stateslist = response.data;
				})
			}

			$scope.addDistrict = function(district) {

				districtService.addDistrict($scope.state.id, district).then(
						function(response) {
							toaster.success({

								body : 'Added Successfully',
								showCloseButton : true,
								timeout : 4000
							});
							$scope.gotoDistrictList();
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

			$scope.updateDistrict = function(district) {
				console.log(district);

				console.log("$scope.districtDetail" + $scope.districtDetail);
				districtService.updateDistrict($scope.districtDetail.state.id,
						$scope.districtDetail.id, $scope.districtDetail).then(
						function(response) {
							toaster.success({

								body : 'Updated Successfully',
								showCloseButton : true,
								timeout : 4000
							});
							$scope.gotoDistrictList();
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
			$scope.recordsPerPage = function() {
				$scope.page = 0;
				$scope.size = $scope.PerPage;
			}

			$scope.$watchGroup([ 'page', 'size' ], function(newVal, oldVal) {
//				if ($scope.state != undefined && $scope.state.id != undefined)
					$scope.searchDistrict();
			});

			$scope.getCount = function(CountUrl) {
				districtService.getCount(CountUrl).then(function(response) {
					$scope.count = response.data;
					$scope.totalPages = Math.ceil($scope.count / $scope.size);
				});
			};

			/**
			 * pagination logic
			 */

			$scope.searchDistrict = function() {
				var url = "?"
				if ($scope.state != undefined) {
					url = url + "stateId=" + $scope.state.id + "&"
				}
				var countUrl = url;
				countUrl = countUrl.substr(0, countUrl.length - 1);
				url = url + "page=" + $scope.page + "&size=" + $scope.size;
				districtService.searchDistrict(url).then(function(response) {
					$scope.districtList = response.data;
					$scope.getCount(countUrl);

				})

			}
			$scope.called = function() {
				$scope.state = undefined;
				$scope.searchDistrict();
			}

		})