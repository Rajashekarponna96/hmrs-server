angular.module('srmt').controller(
		"locationDepartmentController",
		function($scope, $state, $uibModal, locationDepartmentService,
				LocationService, $stateParams, $localStorage, toaster) {

			$scope.locationDepartmentDetails = $stateParams.locationDepartment;
			console.log($scope.locationDepartmentDetails);
			$scope.gotoLocationDepartment = function() {
				$state.go('home.locationDepartmentList');
			};
			$scope.gotoUpdateLocationDepartment = function(dept) {
				$state.go('home.updateLocationDepartment', {
					locationDepartment : dept
				});
			};
			$scope.gotoAddLocationDepartment = function() {
				$state.go('home.addLocationDepartment');
			};
			$scope.viewLocationDepartment = function(dept) {
				$state.go("home.viewLocationDepartment", {
					locationDepartment : dept
				});
			};

			$scope.getAlltLocations = function() {
				LocationService.getAlltLocations().then(function(response) {
					$scope.locationList = response.data;
				})
			}

			$scope.addLocationDepartment = function(locationDept) {
				locationDepartmentService.addLocationDepartment(
						$scope.location.id, locationDept).then(
						function(response) {
							toaster.success({

								body : 'Added Successfully',
								showCloseButton : true,
								timeout : 4000
							});

							$scope.gotoLocationDepartment();
						}, function(error) {

							toaster.pop({
								type : 'error',
								body : error.data.message,
								showCloseButton : true,
								timeout : 4000
							});
						})
			};
			$scope.page = 0;
			$scope.size = 10;
			$scope.getLocationDepartmentList = function() {
				locationDepartmentService.getLocationDepartments($scope.page,
						$scope.size).then(function(response)

				{
					$scope.locationDepartmentList = response.data;
				}, function(error) {
					toaster.pop({
						type : 'error',
						body : error.data.message,
						showCloseButton : true,
						timeout : 4000
					});
				})
			};
			$scope.updateLocationDepartment = function(dept) {
				locationDepartmentService.updateLocationDepartments(
						dept.location.id, dept.id, dept).then(
						function(response) {
							toaster.success({

								body : 'Updated Successfully',
								showCloseButton : true,
								timeout : 4000
							});
							$scope.gotoLocationDepartment();
						}, function(error) {
							toaster.pop({
								type : 'error',
								body : error.data.message,
								showCloseButton : true,
								timeout : 4000
							});
						})
			};

			$scope.deleteOpen = function(id) {
				$scope.delId = id;
				var modalInstance = $uibModal.open({

					templateUrl : 'myModalContent.html',
					controller : 'ModalInstanceCtrl',

				});

				modalInstance.result.then(function() {
					locationDepartmentService.deleteLocationDepartment(id)
							.then(function(response) {
								/*
								 * Notification .error({ message : '<h4><span
								 * class="glyphicon glyphicon-trash"></span>
								 * Department deleted successfully.</h4>',
								 * positionX : 'center', delay : 2000 });
								 */
								$scope.getLocationDepartmentList();
							}, function(error) {
								/*
								 * Notification .error({ message : '<span
								 * class="glyphicon glyphicon-remove-circle"></span>' +
								 * error.data.message, positionX : 'center',
								 * delay : 2000 });
								 */
							})
				});
			};

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
				locationDepartmentService.getCount().then(function(response) {
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
				$scope.getLocationDepartmentList();
				$scope.getCount();
			});

			/**
			 * pagination logic
			 */
			

		});