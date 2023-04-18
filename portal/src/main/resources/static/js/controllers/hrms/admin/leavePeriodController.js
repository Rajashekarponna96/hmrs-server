angular.module('srmt').controller(
		"leavePeriodController",
		function($scope, $state, leavePeriodService, $stateParams, notify,
				$uibModal, $filter, $localStorage,toaster) {

			$scope.leavePeriodDetails = $stateParams.leavePeriodData;
			console.log($stateParams.leavePeriodData);
			$scope.leavePeriod = {
				startDate : '',
				endDate : ''
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
			};

			$scope.$watchGroup([ 'page', 'size' ], function(newVal, oldVal) {
				$scope.getAllLeavePeriods();
			});

			$scope.getCount = function() {
				leavePeriodService.getCount().then(function(response) {
					$scope.count = response.data;
					$scope.totalPages = Math.ceil($scope.count / $scope.size);
				});
			};

			/**
			 * pagination logic gotoViewLeavePeriod(leavePeriod)
			 */

			$scope.gotoLeavePeriodList = function() {
				$state.go('home.leavePeriodList');
			};

			$scope.gotoUpdateLeavePeriod = function(leavePeriod) {
				
				$state.go('home.updateLeavePeriod', {
					leavePeriodData : leavePeriod
				});

			};

			$scope.gotoAddLeavePeriod = function() {
				$state.go('home.addLeavePeriod');
			};

			$scope.gotoViewLeavePeriod = function(thisleavePeriod) {
				console.log("leave period view data: "
						+ angular.toJson(thisleavePeriod));
				$state.go('home.viewLeavePeriod', {
					leavePeriodData : thisleavePeriod
				});
			}

			$scope.getAllLeavePeriods = function() {
				leavePeriodService
						.getLeavePeriodsList($scope.page, $scope.size).then(
								function(response) {

									$scope.leavePeriodList = response.data;
									$scope.getCount();
								}, function(error) {
									toaster.pop({
										type : 'error',
										body : error.data.message,
										showCloseButton : true,
										timeout : 4000
									});

								});
			};

			$scope.deleteLeavePeriod = function(id) {
				leavePeriodService.deleteLeavePeriod(id).then(
						function(response) {
							/*
							 * Notification .success({ message : '<h4><span
							 * class="glyphicon glyphicon-info-sign"></span>
							 * Deleted successfully</h4>', positionX :
							 * 'center', delay : 2000 });
							 */
							$scope.getAllLeavePeriods();
						}, function(error) {
							/*
							 * Notification.error({ message : '<span
							 * class="glyphicon glyphicon-remove-circle"></span>'+error.data.message,
							 * positionX : 'center', delay : 2000 });
							 */
						});
			};

			$scope.addLeavePeriod = function(leavePeriod) {
				leavePeriod.startDate = $filter('date')(leavePeriod.startDate,
						'dd-MM-yyyy');
				leavePeriod.endDate = $filter('date')(leavePeriod.endDate,
						'dd-MM-yyyy');
				leavePeriodService.addLeavePeriod($scope.leavePeriod).then(
						function(response) {
							toaster
							.success({
							
								body : 'Added Successfully',
								showCloseButton : true,
								timeout : 4000
							});
							$scope.gotoLeavePeriodList();
						}, function(error) {
							toaster.pop({
								type : 'error',
								body : error.data.message,
								showCloseButton : true,
								timeout : 4000
							});

						});
			};

			$scope.updateLeavePeriod = function(leavePeriod) {
				leavePeriod.startDate = $filter('date')(leavePeriod.startDate,
						'dd-MM-yyyy');
				leavePeriod.endDate = $filter('date')(leavePeriod.endDate,
						'dd-MM-yyyy');
				leavePeriodService.updateLeavePeriod(leavePeriod).then(
						function(response) {
							toaster
							.success({
							
								body : 'Updated Successfully',
								showCloseButton : true,
								timeout : 4000
							});
							$scope.gotoLeavePeriodList();
						}, function(error) {
							toaster.pop({
								type : 'error',
								body : error.data.message,
								showCloseButton : true,
								timeout : 4000
							});

						});
			};

			$scope.deleteOpen = function(id) {
				$scope.delId = id;
				var modalInstance = $uibModal.open({

					templateUrl : 'myModalContent.html',
					controller : 'ModalInstanceCtrl',

				});

				modalInstance.result.then(function() {
					leavePeriodService.deleteLeavePeriod(id).then(
							function(response) {
								/*
								 * Notification .error({ message : '<h4><span
								 * class="glyphicon glyphicon-trash"></span>
								 * Calendar year deleted successfully.</h4>',
								 * positionX : 'center', delay : 2000 });
								 */
								$scope.getAllLeavePeriods();
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

			

			$scope.dateOptions = {
				startingDay : 1
			};

			$scope.open1 = function() {
				$scope.popup1.opened = true;
			};
			$scope.open2 = function() {
				$scope.popup2.opened = true;
			};
			$scope.popup1 = {
				opened : false
			};
			$scope.popup2 = {
				opened : false
			};

			

		});