angular
		.module('srmt')
		.controller(
				"empLeaveEntitlementController",
				function($scope, leaveTypeService, leavePeriodService,leaveEntitlementService,
						personalService, empLeaveEntitlementService, Notification,employeeService,$localStorage,
						$filter, $uibModal, $state, $stateParams,LocationService, locationDepartmentService,toaster) {
					$scope.page=0;
					$scope.size=10;
					
					$scope.featureActionList = $localStorage.featureActionList;

					$scope.hasFeatureWithAction = function(name) {
						var feature=undefined;
						
						var found = false;
						angular.forEach($scope.featureActionList, function(
								featureAction) {
							
							if (featureAction.feature.name == name) {
								feature = featureAction;
							}
						});
						return feature;
						
					};
					

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
					$scope.getCount = function(countUrl) {
						leaveEntitlementService.SearchLeaveEntitlementsCount(countUrl).then(
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
						$scope.SearchLeaveEntitlements();
					});

					/**
					 * pagination logic
					 */
					$scope.empLeaveEntitlementDetails = $stateParams.empLeaveEntitlement;
					$scope.gotoAddEmpLeaveEntitlement = function() {
						$state.go("home.addEmpempLeaveEntitlement");
					};

					$scope.gotoEmpLeaveEntitlementList = function() {
						$state.go("home.empLeaveEntitlementList");
					};

					$scope.addEmpLeaveEntitlement = function(empLeaveEntitlement) {
						empLeaveEntitlement.balance=empLeaveEntitlement.days;
						empLeaveEntitlementService
								.addEmpempLeaveEntitlement(empLeaveEntitlement)
								.then(
										function(response) {
											toaster
											.success({
												body : 'Added Successfully',
												showCloseButton : true,
												timeout : 4000
											});
											$scope.gotoEmpLeaveEntitlementList();
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
					$scope.getEmployeeList = function() {
						personalService.getAllActiveEmployees().then(
								function(response) {
									$scope.employeeList = response.data;

								})
					};
					$scope.getAllLeavePeriods = function() {
						leavePeriodService.getAllLeavePeriodsList().then(
								function(response) {
									$scope.leavePeriodList = response.data;
								})
					};
					$scope.getAllLeaveTypes = function() {
						leaveTypeService.getAllLeaveTypes().then(
								function(response) {
									$scope.leaveTypeList = response.data;
								})
					};
					
					$scope.getEmpLeaveEntitlementList = function(){
						empLeaveEntitlementService.getEmpLeaveEntitlementList($scope.page,$scope.size).then(function(response){
							$scope.empLeaveEntitlementList = response.data; 
						})
					};
					
					$scope.gotoUpdateEmpLeaveEntitlement = function(thisempLeaveEntitlement){
						$state.go("home.updateempLeaveEntitlement",{
							empLeaveEntitlement : thisempLeaveEntitlement
						});
					};
					
					$scope.updateEmpLeaveEntitlement = function(empLeaveEntitlement){
						empLeaveEntitlementService.updateEmpLeaveEntitlement(empLeaveEntitlement).then(function(response){
							toaster
							.success({
								body : 'Added Successfully',
								showCloseButton : true,
								timeout : 4000
							});
							$scope.gotoEmpLeaveEntitlementList();
				},
				function(error) {
					
					toaster.pop({
						type : 'error',
						body : error.data.message,
						showCloseButton : true,
						timeout : 4000
					});
	
					});};
					
					/*$scope.deleteOpen = function(id) {
						$scope.delId = id;
						var modalInstance = $uibModal.open({

							templateUrl : 'myModalContent.html',
							controller : 'ModalInstanceCtrl',

						});

						modalInstance.result
								.then(
										function() {
											empLeaveEntitlementService
													.deleteEmpLeaveEntitlement(id)
													.then(
															function(response) {
																Notification
																		.error({
																			message : '<h4><span class="glyphicon glyphicon-trash"></span> Leave Entitlement deleted successfully.</h4>',
																			positionX : 'center',
																			delay : 2000
																		});
																$scope
																		.getEmpLeaveEntitlementList();
															},
															function(error) {
																Notification
																		.error({
																			message : '<span class="glyphicon glyphicon-remove-circle"></span>'
																					+ error.data.message,
																			positionX : 'center',
																			delay : 2000
																		});
															})
										});
					};*/
					$scope.viewEmpLeaveEntitlement = function(thisempLeaveEntitlement){
						$state.go("home.viewempLeaveEntitlement",{
							empLeaveEntitlement : thisempLeaveEntitlement
						});
					};
					$scope.getAllLocations = function(){
						LocationService.getAlltLocations().then(function(response){
							$scope.locationList = response.data;
						});
					};
					
					$scope.getDepartments = function(id){
						locationDepartmentService.getAllLocationDepartments(id).then(function(response){
							$scope.departmentList = response.data;
						});
					};
					$scope.getReporties = function() {
						employeeService.getAllReporties($localStorage.loginId)
								.then(function(response) {
									$scope.employeeList = response.data;
								}, function(error) {
									console.log(error);
								});
					};
					
					
					$scope.SearchLeaveEntitlements=function(){
						var url="?"
							if($scope.leavePeriod!=undefined){
								url=url+"leavePeriodId="+$scope.leavePeriod.id+"&";
							}
						if($scope.leaveType!=undefined){
							url=url+"leaveTypeId="+$scope.leaveType.id+"&";
						}
						
						if($scope.employee!=undefined){
							url=url+"employeeId="+$scope.employee.id+"&";
						}
						var countUrl=url;
						dataurl=url+"page="+$scope.page+"&size="+$scope.size;
						leaveEntitlementService.SearchLeaveEntitlements(dataurl).then(function(response){
							$scope.leaveEntitlementList=response.data;
							$scope.getCount(countUrl);
						})
					}
					
				});