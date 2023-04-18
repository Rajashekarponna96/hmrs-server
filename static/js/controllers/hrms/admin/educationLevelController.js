angular.module('srmt').controller(
		"educationLevelController",
		function($scope, $state, educationLevelService, $stateParams,
				$uibModal, $localStorage,toaster) {

			$scope.updateEducationDetails = $stateParams.educationLevel;
			console.log($scope.updateEducationDetails);
			// $scope.educationLevel = $stateParams.updateEducationLevel;
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
				educationLevelService.getCount().then(function(response) {
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
				$scope.getAllEducationLevels();
			});

			/**
			 * pagination logic
			 */

			$scope.gotoEducationLevelDetails = function() {
				$state.go('home.educationLevelList');
			};
			$scope.gotoUpdateEducationLevel = function(thiseducationLevel) {
				console.log("education level: "
						+ angular.toJson(thiseducationLevel));
				$state.go('home.updateEducationLevel', {
					educationLevel : thiseducationLevel
				});
			};
			$scope.gotoAddEducationLevel = function(thiseducationLevel) {
				$state.go('home.addEducationLevel', {
					educationLevel : thiseducationLevel
				});
			};

			$scope.getAllEducationLevels = function() {
				educationLevelService.getAllEducationLevelDetails($scope.page,
						$scope.size).then(function(response) {
					$scope.educationLevelList = response.data;
					$scope.getCount();
				});
			};

			$scope.addEducationLevel = function(educationLevel) {
				educationLevelService.addEducationLevel($scope.educationLevel)
						.then(function(response) {
							toaster
							.success({
							
								body : 'Added Successfully',
								showCloseButton : true,
								timeout : 4000
							});
							$scope.gotoEducationLevelDetails();
						}, function(error) {
							toaster.pop({
								type : 'error',
								body : error.data.message,
								showCloseButton : true,
								timeout : 4000
							});

						})
			};

			$scope.viewEducationLevelDetials = function(thiseducationLevel) {
				$state.go('home.viewEducationLevel', {
					educationLevel : thiseducationLevel
				});
			};
			$scope.updateEducationLevel = function(educationLevel) {
				educationLevelService.updateEducationLevel(
						$scope.updateEducationDetails).then(function(response) {
							toaster
							.success({
							
								body : 'Updated Successfully',
								showCloseButton : true,
								timeout : 4000
							});
					$scope.gotoEducationLevelDetails();
				}, function(error) {
					toaster.pop({
						type : 'error',
						body : error.data.message,
						showCloseButton : true,
						timeout : 4000
					});

				})
			};

			$scope.deleteEducationLevel = function(id) {
				educationLevelService.deleteEducationLevel(id).then(
						function(response) {
							/*
							 * Notification.success({ message : '<h4><span
							 * class="glyphicon glyphicon-info-sign"></span>Deleted
							 * successfully</h4>', positionX: 'center', delay :
							 * 2000 });
							 */
							$scope.getAllEducationLevels();
						}, function(error) {
							/*
							 * Notification.error({ message : '<h4><span
							 * class="glyphicon glyphicon-remove-circle"></span>'+error.data.message+'</h4>',
							 * positionX: 'center', delay : 2000 });
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
					educationLevelService.deleteEducationLevel(id).then(
							function(response) {
								/*
								 * Notification .error({ message : '<h4><span
								 * class="glyphicon glyphicon-trash"></span>
								 * Education Level deleted successfully.</h4>',
								 * positionX : 'center', delay : 2000 });
								 */
								$scope.getAllEducationLevels();
							}, function(error) {
								/*
								 * Notification.error({ message : '<span
								 * class="glyphicon glyphicon-remove-circle"></span>'+error.data.message,
								 * positionX : 'center', delay : 2000 });
								 */
							})
				}, function() {

				});
			};

		});