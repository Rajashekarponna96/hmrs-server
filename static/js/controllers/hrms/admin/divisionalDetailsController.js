angular.module('srmt').controller(
		'divisionalDetailsController',
		function($scope, $state, divisionalDetailsService, $stateParams,Notification,$uibModal) {
			$scope.size = 10;
			$scope.page = 0;

			/**
			 * pagination logic
			 * 
			 * need to  count total page  in count menthos
			 * need to call count() in data  list method.
			 * 
			 * need to call data list methis in 	$scope.$watchGroup([ 'page', 'size' ]
			 * 
			 * need to take care about sno
			 * neeed to check recods for page
			 * need to check totla records
			 */
			$scope.getCount = function() {
				divisionalDetailsService.getCount().then(function(response) {
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
				$scope.page = $scope.totalPages-1;

			};
			$scope.recordsPerPage = function() {
				$scope.page = 0;
				$scope.size = $scope.PerPage;
			}

			$scope.$watchGroup([ 'page', 'size' ], function(newVal, oldVal) {
				$scope.getAllDivisionalDetails();
			});

			/**
			 * pagination logic
			 */
			$scope.updateDivisionDetail = $stateParams.divisionalDetail;
			$scope.gotoAddDivisionalDetial = function() {

				$state.go('home.addDivisionalDetail');
			};
			$scope.gotoEditDivisionalDetail = function(divisionalDetail) {
				$state.go('home.editDivisionalDetail', {
					divisionalDetail : divisionalDetail
				});
			};
			$scope.gotoDivisionalDetails = function(divisionalDetails) {
				$scope.divisionalDetail = divisionalDetails;
				$state.go('home.divisionalDetailsList');
			};

			$scope.addDivisionalDetail = function() {
				divisionalDetailsService.addDivisionalDetail(
						$scope.divisionalDetail).then(function(response) {
							Notification.success({
								message :  '<h4><span class="glyphicon glyphicon-ok"></span>Division added successfully.</h4>',
								positionX: 'center',
								delay : 2000
							});
							$scope.gotoDivisionalDetails();
						},function(error) {
							Notification.error({
								message : '<h4><span class="glyphicon glyphicon-remove-circle"></span>'+error.data.message+'</h4>',
								positionX: 'center',
								delay : 2000
							});
						})
			};

			$scope.getAllDivisionalDetails = function() {
				divisionalDetailsService.getAllDivisionalDetails($scope.page,
						$scope.size).then(function(response) {
					$scope.divisionDetailsList = response.data;
					$scope.getCount();
				});
			};

			$scope.updateDivisionalDetail = function() {
				divisionalDetailsService.updateDivisionalDetail(
						$scope.updateDivisionDetail).then(function(response) {
							Notification.info({
								message : '<h4><span class="glyphicon glyphicon-info-sign"></span>Division updated successfully.</h4>',
								positionX: 'center',
								delay : 2000
							});
							$scope.gotoDivisionalDetails();
						},function(error) {
							Notification.error({
								message : '<h4><span class="glyphicon glyphicon-remove-circle"></span>'+error.data.message+'</h4>',
								positionX: 'center',
								delay : 2000
							});
						})
			};

			$scope.deleteDivisionalDetail = function(id) {
				divisionalDetailsService.deleteDivisionalDetail(id).then(function(response) {
					Notification.error({
						message :  '<h4><span class="glyphicon glyphicon-info-sign"></span>Division deleted successfully.</h4>',
						positionX: 'center',
						delay : 2000
					});
					$scope.getAllDivisionalDetails();
				},function(error) {
					Notification.error({
						message : '<h4><span class="glyphicon glyphicon-remove-circle"></span>'+error.data.message+'</h4>',
						positionX: 'center',
						delay : 2000
					});
				})
			};

			$scope.gotoViewDivisionalDetails = function(divisionalDetail) {
				$state.go('home.viewDivisionalDetails', {
					divisionalDetail : divisionalDetail
				});
			};

			$scope.deleteOpen = function(id) {
				$scope.delId = id;
				var modalInstance = $uibModal.open({
					
					templateUrl: 'myModalContent.html',
				    controller: 'ModalInstanceCtrl',
				    	
				});

				modalInstance.result.then(function() {
					divisionalDetailsService.deleteDivisionalDetail(id).then(
							function(response) {
								Notification
										.error({
											message : '<h4><span class="glyphicon glyphicon-trash"></span>Division deleted successfully.</h4>',
											positionX : 'center',
											delay : 2000
										});
								$scope.getAllDivisionalDetails();
							},function(error) {
								Notification.error({
									message : '<span class="glyphicon glyphicon-remove-circle"></span>'+error.data.message,
									positionX : 'center',
									delay : 2000
								});
							})
				}, function() {
					
				});
			};	

			

		});