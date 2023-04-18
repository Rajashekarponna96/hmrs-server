angular.module('srmt').controller(
		"leaveTypeController",
		function($scope, $state, leaveTypeService, $stateParams, $uibModal, $localStorage,toaster) {

			$scope.leaveTypeDetails = $stateParams.leaveTypeData;
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
				$scope.getAllLeaveTypes();
			});

			$scope.getCount = function() {
				leaveTypeService.getCount().then(function(response) {
					$scope.count = response.data;
					$scope.totalPages = Math.ceil($scope.count / $scope.size);
				});
			};

			/**
			 * pagination logic gotoViewLeaveType(leaveType)
			 */

			$scope.gotoLeaveTypeList = function() {
				$state.go('home.leaveTypeList');
			};

			$scope.gotoUpdateLeaveType = function(leaveType) {
				$state.go('home.updateLeaveType',{
					leaveTypeData : leaveType
				});

			};

			$scope.gotoAddLeaveType = function() {
				$state.go('home.addLeaveType');
			};
			
			$scope.gotoViewLeaveType = function(thisleaveType){
				console.log("leave period view data: "+angular.toJson(thisleaveType));
				$state.go('home.viewLeaveType',{
					leaveTypeData : thisleaveType
				});
			}

			$scope.getAllLeaveTypes = function() {
				leaveTypeService.getLeaveTypesList($scope.page, $scope.size).then(
								function(response) {
									$scope.leaveTypeList = response.data;
									$scope.getCount();
								},function(error) {
									toaster.pop({
										type : 'error',
										body : error.data.message,
										showCloseButton : true,
										timeout : 4000
									});

								});
			};
			
			
			$scope.deleteLeaveType = function(id){
				leaveTypeService.deleteLeaveType(id).then(function(response){
					/*Notification
					.success({
						message : '<h4><span class="glyphicon glyphicon-info-sign"></span> Deleted successfully</h4>',
						positionX : 'center',
						delay : 2000
					});*/
					$scope.getAllLeaveTypes();
				},function(error) {
					/*Notification.error({
						message : '<span class="glyphicon glyphicon-remove-circle"></span>'+error.data.message,
						positionX : 'center',
						delay : 2000
					});*/
				});
			};
			

			$scope.addLeaveType = function(leaveType) {
				leaveTypeService.addLeaveType($scope.leaveType).then(
						function(response) {
							toaster
							.success({
							
								body : 'Added Successfully',
								showCloseButton : true,
								timeout : 4000
							});
							$scope.gotoLeaveTypeList();
						},function(error) {
							toaster.pop({
								type : 'error',
								body : error.data.message,
								showCloseButton : true,
								timeout : 4000
							});

						});
			};
			
			$scope.updateLeaveType = function(leaveType){
				leaveTypeService.updateLeaveType(leaveType).then(function(response) {
					toaster
					.success({
					
						body : 'Updated Successfully',
						showCloseButton : true,
						timeout : 4000
					});
					$scope.gotoLeaveTypeList();
				},function(error) {
					toaster.pop({
						type : 'error',
						body : error.data.message,
						showCloseButton : true,
						timeout : 4000
					});

				});
			};
			
			
			/*      delete  */
			$scope.deleteOpen = function(id) {
				$scope.delId = id;
				var modalInstance = $uibModal.open({
					
					templateUrl: 'myModalContent.html',
				    controller: 'ModalInstanceCtrl',
				    	
				});

				modalInstance.result.then(function() {
					leaveTypeService.deleteLeaveType(id).then(
							function(response) {
								/*Notification
										.error({
											message : '<h4><span class="glyphicon glyphicon-trash"></span> Leave Type deleted successfully.</h4>',
											positionX : 'center',
											delay : 2000
										});*/
								$scope.getAllLeaveTypes();
							},function(error) {
								toaster.pop({
									type : 'error',
									body : error.data.message,
									showCloseButton : true,
									timeout : 4000
								});

							})
				});
			};	

			
		});