angular.module('srmt').controller(
		"designationController",
		function($scope, $state, designationService, $stateParams, $uibModal,
				$localStorage, toaster) {

			$scope.designationDetail = $stateParams.designation
			$scope.gotoDesignationList = function() {
				$state.go('home.designationList');
			}
			$scope.gotoAddDesignationList = function() {
				$state.go('home.addDesignation');
			}

			$scope.gotoUpdateDesignationList = function(designation) {
				$state.go('home.updateDesignation', {
					designation : designation
				});
			}
			$scope.gotoViewDesignationList = function(designation) {
				$state.go('home.viewDesignation', {
					designation : designation
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
				$scope.getDesignationList();
			});

			$scope.getCount = function() {
				designationService.getCount().then(function(response) {
					$scope.count = response.data;
					$scope.totalPages = Math.ceil($scope.count / $scope.size);
				});
			};

			/**
			 * pagination logic
			 */

			$scope.addDesignation = function(designation) {
				designationService.addDesignation(designation).then(
						function(response) {
							toaster.success({

								body : 'Added Successfully',
								showCloseButton : true,
								timeout : 4000
							});
							$scope.gotoDesignationList();
						}, function(error) {
							toaster.pop({
								type : 'error',
								body : error.data.message,
								showCloseButton : true,
								timeout : 4000
							});
						})
			};

			$scope.getDesignationList = function() {
				designationService.getDesignationList($scope.page, $scope.size)
						.then(function(response) {
							$scope.designationList = response.data;
							$scope.getCount();
						});
			};
			$scope.updateDesignation = function(designationDetail) {
				designationService.updateDesignation(designationDetail.id,
						designationDetail).then(function(response) {
					$scope.gotoDesignationList();
					toaster.success({

						body : 'Updated Successfully',
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
			};
			$scope.deletedesignation = function(designationDetail) {
				designationService.deletedesignation(designationDetail).then(
						function(response) {
							$scope.getDesignationList();
							/*
							 * Notification .success({ message : '<h4><span
							 * class="glyphicon glyphicon-info-sign"></span>
							 * Deleted successfully', positionX : 'center',
							 * delay : 2000 });
							 */
						}, function(error) {
							/*
							 * Notification .error({ message : '<h4><span
							 * class="glyphicon glyphicon-remove-circle"></span>' +
							 * error.data.message + '</h4>', positionX :
							 * 'center', delay : 2000 });
							 */
						})
			}

			$scope.deleteOpen = function(id) {
				$scope.delId = id;
				var modalInstance = $uibModal.open({

					templateUrl : 'myModalContent.html',
					controller : 'ModalInstanceCtrl',

				});

				modalInstance.result.then(function() {
					designationService.deletedesignation(id).then(
							function(response) {
								/*
								 * Notification .error({ message : '<h4><span
								 * class="glyphicon glyphicon-trash"></span>
								 * Designation deleted successfully.</h4>',
								 * positionX : 'center', delay : 2000 });
								 */
								$scope.getDesignationList();
							}, function(error) {
								/*
								 * Notification.error({ message : '<span
								 * class="glyphicon glyphicon-remove-circle"></span>'+error.data.message,
								 * positionX : 'center', delay : 2000 });
								 */
							})
				});
			};

			

		});