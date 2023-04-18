angular.module('srmt').controller(
		"featureController",
		function($scope, $localStorage, featureService, notify,toaster) {

			$scope.featureActionList = $localStorage.featureActionList;

			$scope.hasFeatureWithAction = function(name) {
				var feature = undefined;

				var found = false;
				angular.forEach($scope.featureActionList, function(
						featureAction) {

					if (featureAction.feature.name == name) {
						feature = featureAction;
					}
				});
				return feature;

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
			$scope.getCount = function() {
				featureService.getCount().then(function(response) {
					$scope.count = response.data;
					$scope.totalPages = Math.ceil($scope.count / $scope.size);
				});
			};

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
				$scope.getFeatures();
			});

			/**
			 * pagination logic
			 */

			$scope.addFeature = function(feature) {
				featureService.addFeature(feature).then(function(response) {
					$scope.getFeatures();
					toaster
					.success({
					
						body : 'Added Successfully',
						showCloseButton : true,
						timeout : 4000
					});
				}, function(error) {
					toaster.pop({
						type : 'error',
						body : error.data.message,
						showCloseButton : true,
						timeout : 4000
					});

				})
			}

			$scope.getFeatures = function() {

				featureService.getFeatures($scope.page, $scope.size).then(
						function(response) {
							console.log("service called");
							$scope.featureList = response.data;
						})
			}

		});