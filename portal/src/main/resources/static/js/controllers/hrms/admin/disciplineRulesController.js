angular
		.module('srmt')
		.controller(
				"disciplineRulesController",
				function($scope, $state, disciplineService, $stateParams,
						 $uibModal, $localStorage,toaster) {
					$scope.disciplineRuleDetails = $stateParams.disciplineRuleData;
					$scope.gotoDisciplineRuleList = function() {
						$state.go("home.disciplineRuleList");
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
						$scope.getAllDisciplineRules();
					});

					$scope.getCount = function() {
						disciplineService.getCount().then(
								function(response) {
									$scope.count = response.data;
									$scope.totalPages = Math.ceil($scope.count
											/ $scope.size);
								});
					};

					/**
					 * pagination logic gotoViewLeaveType(leaveType)
					 */

					$scope.gotoAddDisciplineRule = function() {
						$state.go('home.disciplineRules');
					};

					$scope.addDisciplineRule = function(discipline) {
						console.log("actions: "
								+ angular.toJson($scope.disciplineActions));
						discipline.disciplineActions = $scope.disciplineActions;
						disciplineService
								.addDiscipline(discipline)
								.then(
										function(response) {
											toaster
											.success({
											
												body : 'Added Successfully',
												showCloseButton : true,
												timeout : 4000
											});
											$scope.gotoDisciplineRuleList();
										},
										function(error) {
											toaster.pop({
												type : 'error',
												body : error.data.message,
												showCloseButton : true,
												timeout : 4000
											});
										});
					};

					$scope.disciplineActions = [];

					$scope.addDisciplineAction = function() {

						if ($scope.selectedIndex == undefined) {
							$scope.disciplineActions.push(angular
									.copy($scope.disciplineAction));
							$scope.disciplineAction = {};

						} else {
							$scope.disciplineActions[$scope.selectedIndex] = angular
									.copy($scope.disciplineAction);
							$scope.selectedIndex = undefined;
							$scope.disciplineAction = {};
						}

					}
					$scope.modifyDisciplineActions = function() {
						if ($scope.selectedIndex == undefined) {
							$scope.disciplineRuleDetails.disciplineActions
									.push(angular.copy($scope.disciplineAction));
							$scope.disciplineAction = {};

						} else {
							$scope.disciplineRuleDetails.disciplineActions[$scope.selectedIndex] = angular
									.copy($scope.disciplineAction);
							$scope.selectedIndex = undefined;
							$scope.disciplineAction = {};
						}

					}
					$scope.removeItem = function(index) {
						$scope.disciplineActions.splice(index, 1);
					};
					$scope.removeDisciplineActionsModify = function(index) {
						$scope.disciplineRuleDetails.disciplineActions.splice(
								index, 1);
					}
					$scope.modifyDisciplineActionsForUpdate = function(
							disciplineAction) {
						$scope.disciplineRuleDetails.disciplineActions
								.push(disciplineAction);
					}
					$scope.removeDisciplineActionsInModify = function(index) {
						$scope.disciplineRuleDetails.disciplineActions.splice(
								index, 1);
					}

					$scope.editDisciplineAction = function(disciplineAction,
							selectedIndex) {
						$scope.selectedIndex = selectedIndex;
						$scope.disciplineAction = angular
								.copy(disciplineAction);
					}
					$scope.editDisciplineActionForUpdate = function(
							disciplineAction, selectedIndex) {
						$scope.selectedIndex = selectedIndex;
						$scope.disciplineAction = angular
								.copy(disciplineAction);
					}

					$scope.getAllDisciplineRules = function() {
						disciplineService
								.getDisciplineRules($scope.page, $scope.size)
								.then(
										function(response) {
											$scope.getCount();
											$scope.disciplineList = response.data;
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

					$scope.gotoViewDisciplineRule = function(thisdisciplineRule) {
						$state.go("home.viewDisciplineRule", {
							disciplineRuleData : thisdisciplineRule
						});
					};

					$scope.gotoUpdateDisciplineRule = function(
							thisdisciplineRule) {
						$state.go("home.updateDisciplineRule", {
							disciplineRuleData : thisdisciplineRule
						});
					};

					$scope.updateDisciplineRule = function(disciplineRule) {

						disciplineService
								.updateDisciplineRule(disciplineRule.id,
										disciplineRule)
								.then(
										function(response) {
											toaster
											.success({
											
												body : 'Updated Successfully',
												showCloseButton : true,
												timeout : 4000
											});
											$scope.gotoDisciplineRuleList();
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
								.then(function() {
									disciplineService
											.deleteDisciplineRule(id)
											.then(
													function(response) {
														/*Notification
																.error({
																	message : '<h4><span class="glyphicon glyphicon-trash"></span> Discipline Rule deleted successfully.</h4>',
																	positionX : 'center',
																	delay : 2000
																});*/
														$scope
																.getAllDisciplineRules();
													},
													function(error) {
														/*Notification
																.error({
																	message : '<span class="glyphicon glyphicon-remove-circle"></span>'
																			+ error.data.message,
																	positionX : 'center',
																	delay : 2000
																});*/
													})
								});
					};
					
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


				});