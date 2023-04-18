angular.module('srmt').controller(
		"controlController",
		function($scope, $state, controlService, $stateParams, $localStorage,
				toaster) {

			$scope.gotoControlsList = function() {
				$state.go('home.transport.controlList');
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
				$scope.getControls();
			});

			$scope.getCount = function() {
				controlService.getCount().then(function(response) {
					$scope.count = response.data;
					$scope.totalPages = Math.ceil($scope.count / $scope.size);
				});
			};

			/**
			 * pagination logic
			 */

			$scope.gotoAddControlsList = function() {
				$state.go('home.transport.addControl');
			}
			
			
			$scope.controlDetail = $stateParams.control;
			$scope.gotoUpadeControlsList = function(control) {
				$state.go('home.transport.updateControl', {
					control : control
				});
			}

			$scope.gotoViewControl = function(control) {
				$state.go('home.transport.viewControl', {
					control : control
				})
			}
			/*$scope.gotoDeleteControl = function(id) {
				controlService.deleteControl(id).then(function(response) {
					alert("deleted successfully");
					$scope.getControls();
				})
			}*/

			$scope.getControls = function() {

			controlService.getControlList($scope.page, $scope.size).then(
						function(response) {
							$scope.controlList = response.data;
							$scope.getCount();
						})
			}
			$scope.addControl = function(control) {

				controlService.addControl(control).then(function(response) {
					toaster.success({
						body : 'Added Successfully',
						showCloseButton : true,
						timeout : 4000
					});

					$scope.gotoControlsList();
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

			$scope.updateControl = function(control) {

				controlService.updateControl(control.id, control).then(
						function(response) {

							toaster.success({
								body : 'Updated Successfully',
								showCloseButton : true,
								timeout : 4000
							});
							$scope.gotoControlsList();
						},

						function(error) {

							toaster.pop({
								type : 'error',
								body : error.data.message,
								showCloseButton : true,
								timeout : 8000
							});

						})
			};

			
		})