angular
		.module('srmt')
		.controller(
				"workShiftController",
				function($scope, $state, workShiftService, $stateParams,
						notify, $uibModal,$filter, $localStorage,toaster) {
					$scope.workShiftDetails = $stateParams.workShift;

					$scope.gotoWorkShiftDetails = function() {
						$state.go('home.worKShiftDetails');
					}

					$scope.gotoAddWorkShiftDetails = function() {
						$state.go('home.addWorkShift');
					}
					$scope.gotoEditWorkShiftDetails = function(workShift) {
						
						$state.go('home.editWorkShift', {
							workShift : workShift
						});
					}
					$scope.gotoViewWorkShiftDetails = function(workShift) {
						$state.go('home.viewWorkShift', {
							workShift : workShift
						});
					}

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
					};

					$scope.$watchGroup([ 'page', 'size' ], function(newVal,
							oldVal) {
						$scope.getWorkShiftsList();
					});

					$scope.getCount = function() {
						workShiftService.getCount().then(
								function(response) {
									$scope.count = response.data;
									$scope.totalPages = Math.ceil($scope.count
											/ $scope.size);
								});
					};

					/**
					 * pagination logic gotoViewLeaveType(leaveType)
					 */

					$scope.getWorkShiftsList = function() {
						workShiftService.getWorkShiftsList($scope.page,
								$scope.size).then(function(response) {
							$scope.workShiftList = response.data;
							$scope.getCount();
						});
					};
					$scope.inspiniaTemplate = 'views/common/notify.html';
					$scope.deleteWorkShift = function(id) {
						workShiftService.deleteWorkShift(id).then(
								function(response) {
									$scope.getWorkShiftsList();
									notify({
										   message : '<span class="glyphicon glyphicon-trash">Work shift deleted Successfully.</span>',
										   classes : 'alert-info',
										   templateUrl : $scope.inspiniaTemplate
										  });
								}, function(error) {
									notify({
										   message : error.data.message,
										   classes : 'alert-info',
										   templateUrl : $scope.inspiniaTemplate
										  });
								})
					};

					$scope.addWorkShift = function(workShift) {
					
						workShift.workShiftBreaks = $scope.workShiftBreaks;
						
						workShiftService
								.addWorkShift(workShift)
								.then(
										function(response) {

											toaster
											.success({
											
												body : 'Added Successfully',
												showCloseButton : true,
												timeout : 4000
											});
											$scope.gotoWorkShiftDetails();
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

					$scope.updateWorkShift = function(workShift) {
						
						workShiftService
								.updateWorkShift(workShift)
								.then(
										function(response) {

											toaster
											.success({
											
												body : 'Updated Successfully',
												showCloseButton : true,
												timeout : 4000
											});
											$scope.gotoWorkShiftDetails();
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

					$scope.deleteOpen = function(id) {
						$scope.delId = id;
						var modalInstance = $uibModal.open({

							templateUrl : 'myModalContent.html',
							controller : 'ModalInstanceCtrl',

						});

						modalInstance.result
								.then(
										function() {
											workShiftService
													.deleteWorkShift(id)
													.then(
															function(response) {
																notify({
																	   message : '<span class="glyphicon glyphicon-trash">Work shift Deleted Successfully.</span>',
																	   classes : 'alert-error',
																	   templateUrl : $scope.inspiniaTemplate
																	  });
																$scope
																		.getWorkShiftsList();
															},
															function(error) {
																Notification
																		.error({
																			message : '<h4><span class="glyphicon glyphicon-remove-circle"></span>'
																					+ error.data.message
																					+ '</h4>',
																			positionX : 'center',
																			delay : 2000
																		});
															})
										}, function() {

										});
					};
					$scope.workShiftBreaks = [];
					$scope.addWorkShiftBreaks = function() {

						if ($scope.selectedIndex == undefined) {
							/*$scope.workShiftBreak.fromTime = $filter("date")($scope.workShiftBreak.fromTime,"HH:mm");
							$scope.workShiftBreak.toTime = $filter("date")($scope.workShiftBreak.toTime,"HH:mm");*/
							$scope.workShiftBreaks.push(angular
									.copy($scope.workShiftBreak));
							$scope.workShiftBreak={};
							
						} else {
/*//							if($scope.workShiftBreak.fromTime.indexOf(":")==-1)
							$scope.workShiftBreak.fromTime = $filter("date")($scope.workShiftBreak.fromTime, "HH:mm");
//							if($scope.workShiftBreak.toTime.indexOf(":")==-1)
							$scope.workShiftBreak.toTime = $filter("date")($scope.workShiftBreak.toTime, "HH:mm");*/
							$scope.workShiftBreaks[$scope.selectedIndex] = angular.copy($scope.workShiftBreak);
							$scope.selectedIndex=undefined;
							$scope.workShiftBreak={};
						}

					}

					$scope.addWorkShiftBreaksForUpdate = function() {
						if($scope.selectedIndex==undefined){
							/*$scope.shiftBreak.fromTime = $filter("date")($scope.shiftBreak.fromTime,"HH:mm");
							$scope.shiftBreak.toTime = $filter("date")($scope.shiftBreak.toTime, "HH:mm");*/
							
							$scope.workShiftDetails.workShiftBreaks.push(angular
									.copy($scope.shiftBreak));
							$scope.shiftBreak = {};

						}else
							{
/*//							if($scope.shiftBreak.fromTime.indexOf(":")==-1)
								$scope.shiftBreak.fromTime = $filter("date")($scope.shiftBreak.fromTime,"HH:mm");
//							if($scope.shiftBreak.toTime.indexOf(":")==-1)
								$scope.shiftBreak.toTime = $filter("date")($scope.shiftBreak.toTime,"HH:mm");*/
							
							$scope.workShiftDetails.workShiftBreaks[$scope.selectedIndex]=angular.copy($scope.shiftBreak);
							$scope.selectedIndex=undefined;
							$scope.shiftBreak = {};
							}
							
						
					}
					$scope.deleteworkBreakForUpdate = function(index) {
						$scope.workShiftDetails.workShiftBreaks.splice(index, 1);

					}

					$scope.deleteworkBreak = function(index) {
						$scope.workShiftBreaks.splice(index, 1);

					}
					$scope.editWorkBreak = function(workbreak, selectedIndex) {
						$scope.selectedIndex = selectedIndex;
						$scope.workShiftBreak = angular.copy(workbreak);

					}
					$scope.editWorkBreakforUpdate = function(workbreak,index) {
						$scope.shiftBreak = angular.copy(workbreak);
						$scope.selectedIndex=index;
					}
					
					
					$scope.init = function(){
						/*var time = $scope.workShiftDetails.fromTime.split(':');
						var time2 = $scope.workShiftDetails.toTime.split(':');
						$scope.workShiftDetails.fromTime = new Date(2016,01,01,time[0],time[1]);
						$scope.workShiftDetails.toTime = new Date(2016,01,01,time2[0],time2[1]);*/
					}
				});