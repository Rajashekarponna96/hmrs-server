angular
		.module('srmt')
		.controller(
				'rolesController',
				function($scope, $state, holidayService, roleService,
						leavePeriodService, lookupService, $localStorage,
						divisionalDetailsService, $stateParams, $uibModal,
						$filter, featureService, featureCategoryService,toaster) {

					
					$scope.size = 20;
					$scope.page = 0;

					$scope.gotoAddRole = function() {
						$state.go("home.usermgmt.addRole");
					}
					$scope.roleDetail = $stateParams.role;
					console.log($scope.roleDetail);
					$scope.gotoRoleList = function() {
						$state.go("home.usermgmt.rolesList");
					}

					$scope.gotoUpdateRole = function(role) {
						$state.go("home.usermgmt.updateRole", {
							role : role
						})
					}
					$scope.role = {
						featureActions : []

					}
					$scope.flag = false;

					$scope.addFeature = function() {
						$scope.flag = false;
						var featureAction = {
							feature : $scope.feature,
							updateAction : false,
							createAction : false,
							viewAction : false,
							deleteAction : false

						}
						angular
								.forEach(
										$scope.role.featureActions,
										function(featureActionObj) {
											if (featureActionObj.feature.name == featureAction.feature.name) {
												toaster.pop({
													type : 'error',
													body :'Duplicate Entry For Feature',
													showCloseButton : true,
													timeout : 8000
												});
												$scope.flag = true;
											}
										})
						if ($scope.flag == false) {
							$scope.role.featureActions.push(angular
									.copy(featureAction));
							$scope.featureCategory = {};
							$scope.feature = {};
						}

					}

					$scope.addRole = function(role) {
						role.featureActions = $scope.role.featureActions;
						roleService.addRole(role).then(function(response) {
							toaster
							.success({
							
								body : 'Added Successfully',
								showCloseButton : true,
								timeout : 4000
							});

							$scope.gotoRoleList();

						}, function(error) {
							toaster.pop({
								type : 'error',
								body : error.data.message,
								showCloseButton : true,
								timeout : 4000
							});
						})
					}

					$scope.deleteFeatureAction = function(index) {
						$scope.role.featureActions.splice(index, 1);
					}

					$scope.getRoles = function() {
						roleService.getRoles().then(function(response) {
							$scope.roleList = response.data;
						})
					}

					$scope.getAllFeatureCategories = function() {
						featureCategoryService.getAllFeatureCategories().then(
								function(response) {
									$scope.featureCategoryList = response.data;
								})
					}

					$scope.addFeatureInUpdate = function() {
						$scope.flag = false;
						var featureAction = {
							feature : $scope.feature,
							updateAction : false,
							createAction : false,
							viewAction : false,
							deleteAction : false

						}
						angular
								.forEach(
										$scope.featureActionsList,
										function(featureActionObj) {
											if (featureActionObj.feature.name == featureAction.feature.name) {
												toaster.pop({
													type : 'error',
													body :'Duplicate Entry For Feature',
													showCloseButton : true,
													timeout : 8000
												});
												$scope.flag = true;
											}
										})
						if ($scope.flag == false) {
							$scope.featureActionsList.push(angular
									.copy(featureAction));
							$scope.featureCategory = {};
							$scope.feature = {};
						}

					}

					$scope.updateRole = function(role) {
						role.featureActions = $scope.featureActionsList;
						roleService.updateRole(role.id, role).then(
								function(response) {
									toaster
									.success({
									
										body : 'Updated Successfully',
										showCloseButton : true,
										timeout : 4000
									});

									$scope.gotoRoleList();

								}, function(error) {
									toaster.pop({
										type : 'error',
										body : error.data.message,
										showCloseButton : true,
										timeout : 4000
									});

								})
					}

					$scope.deleteFeatureActionInupdate = function(index) {
						$scope.featureActionsList.splice(index, 1);
					};
					
					$scope.getAllFeatureActions = function(roleDetailId){
						roleService.getFeatureActionsByRoleId(roleDetailId).then(function(response){
							$scope.featureActionsList = response.data;
							$scope.dataLoaded = true;
						})
					}

					$scope.checkAll = function() {
						$scope.featureAction = {
							feature : $scope.feature,
							updateAction : false,
							createAction : false,
							viewAction : false,
							deleteAction : false

						}
					};

					$scope.optionToggled = function() {
						$scope.isAllSelected = $scope.role.featureActions
								.every(function(itm) {
									return itm.selected;
								})
					};

					$scope.toggleAll = function() {
						var toggleStatus = !$scope.isAllSelected;
						angular.forEach($scope.role.featureActions, function(itm) {
							itm.createAction = toggleStatus;
							itm.deleteAction = toggleStatus;
							itm.viewAction = toggleStatus;
							itm.updateAction = toggleStatus;
						});

					}

				});
