angular
		.module('srmt')
		.controller(
				"employmentTypeController",
				function($scope, $state, $stateParams, employmentTypeService,
						$uibModal, $localStorage,toaster) {
					$scope.updateEmployementType = $stateParams.employmentType;
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
					$scope.getCount = function() {
						employmentTypeService.getCount().then(
								function(response) {
									$scope.count = response.data;
									$scope.totalPages = Math.ceil($scope.count
											/ $scope.size);
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
						$scope.getAllEmploymentTypes();
					});

					/**
					 * pagination logic
					 */

					$scope.gotoEmployemntTypeList = function() {
						$state.go('home.employmentTypeList');
					}

					$scope.gotoAddEmploymentType = function() {
						$state.go('home.addEmploymentType');
					}

					$scope.gotoUpdateEmploymentType = function(
							updateEmploymentDetails) {
						$state.go('home.updateEmploymentType', {
							employmentType : updateEmploymentDetails
						});
					};

					$scope.getAllEmploymentTypes = function() {
						employmentTypeService.getEmploymentTypeList(
								$scope.page, $scope.size).then(
								function(response) {
									$scope.employmentTypeList = response.data;
									$scope.getCount();
								});
					};
					$scope.addEmploymentType = function() {
						employmentTypeService.addEmploymentType(
								$scope.employmentType).then(function(response) {
							toaster.success({

								body : 'Added Successfully',
								showCloseButton : true,
								timeout : 4000
							});
							$scope.gotoEmployemntTypeList();
						}, function(error) {
							toaster.pop({
								type : 'error',
								body : error.data.message,
								showCloseButton : true,
								timeout : 4000
							});

						})
					};

					$scope.updateEmploymentType = function() {
						employmentTypeService.updateEmploymentType(
								$scope.updateEmployementType).then(
								function(response) {
									toaster.success({

										body : 'Updated Successfully',
										showCloseButton : true,
										timeout : 4000
									});
									$scope.gotoEmployemntTypeList();
								}, function(error) {
									toaster.pop({
										type : 'error',
										body : error.data.message,
										showCloseButton : true,
										timeout : 4000
									});

								})
					};

					$scope.deleteEmploymentType = function(id) {
						employmentTypeService.deleteEmploymentType(id).then(
								function(response) {
									/*
									 * Notification.success({ message : '<h4><span
									 * class="glyphicon glyphicon-info-sign"></span>Deleted
									 * successfully</h4>', positionX:
									 * 'center', delay : 2000 });
									 */
									$scope.getAllEmploymentTypes();
								}, function(error) {
									/*
									 * Notification.error({ message :'<h4><span
									 * class="glyphicon
									 * glyphicon-remove-circle"></span>'+error.data.message+'</h4>',
									 * positionX: 'center', delay : 2000 });
									 */
								})
					};

					$scope.viewEmploymentType = function(thisemploymentType) {
						console.log("job title "
								+ angular.toJson(thisemploymentType));
						$state.go('home.viewEmploymentType', {
							employmentType : thisemploymentType
						});
					};

					$scope.deleteOpen = function(id) {
						$scope.delId = id;
						var modalInstance = $uibModal.open({

							templateUrl : 'myModalContent.html',
							controller : 'ModalInstanceCtrl',

						});

						modalInstance.result.then(function() {
							employmentTypeService.deleteEmploymentType(id)
									.then(function(response) {
										/*
										 * Notification .error({ message : '<h4><span
										 * class="glyphicon glyphicon-trash"></span>
										 * Employment Type deleted successfully.</h4>',
										 * positionX : 'center', delay : 2000
										 * });
										 */
										$scope.getAllEmploymentTypes();
									})
						});
					};
					

				});