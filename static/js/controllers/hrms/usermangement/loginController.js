angular
		.module('srmt')
		.controller(
				'loginController',
				function($scope, $state, userService, roleService, $localStorage,
						broadCasteMessagesService, $stateParams, $uibModal,toaster,notify
						) {

					$scope.featureActionList = $localStorage.featureActionList;
					$scope.broadcastMessage = $stateParams.broadcastMessage;
					$scope.hasFeatureWithAction = function(name) {
						var feature = undefined;

						var found = false;
						angular.forEach($scope.featureActionList, function(
								featureAction) {

							if (featureAction.feature.name == name) {
								feature = featureAction;
							}
						});
						return feature;

					};

					$scope.user = {};
					$scope.inspiniaTemplate = 'views/common/notify.html';
					$scope.login = function() {
						delete $localStorage.usrCredentials;
						delete $localStorage.loginId;
						delete $localStorage.features;
						delete $localStorage.featureActionList;
						delete $localStorage.userName;
						$localStorage.$save();
						
						/* Update new credentials to local storage */
						var usrCredentials = "Basic "
								+ btoa($scope.user.userName + ":"
										+ $scope.user.password);
						$localStorage.usrCredentials = usrCredentials;
						$localStorage.$save();

						userService
								.doLogin($scope.user)
								.then(
										function(response) {
											$localStorage.loginId = response.data.employeeId;
											
											$scope.roleId = response.data.role.id;
											$scope.getFeatureActionList();
										},
										function(error) {
											notify({
												message : 'login failed',
												classes : 'alert-danger',
												templateUrl : $scope.inspiniaTemplate
											});										})
					};
					$scope.getFeatureActionList = function(){
						roleService.getFeatureActionsByRoleId($scope.roleId).then(function(response){
							$localStorage.featureActionList = response.data;//.role.featureActions;
							$localStorage.userName = $scope.user.userName;
//							console.log(JSON.stringify(response.data));
							$localStorage.$save();
							notify({
								message : 'Successfully Logged in ',
								classes : 'alert-info',
								templateUrl : $scope.inspiniaTemplate
								
							});
							$state.go('home.dashboard');
						})
					};

					$scope.getBroadcastMessagesCurrentday = function() {
						broadCasteMessagesService
								.getCurrentDayMessages()
								.then(
										function(response) {
											$scope.broadCastMessageList = response.data;

										});
					};

					$scope.openMessage = function(message) {
						$scope.message = message;
						/*
						 * var modalInstance = $uibModal.open({
						 * 
						 * templateUrl : 'openBroadcastMessagePopup.html',
						 * controller : 'openBroadcastMessageCtrl', scope :
						 * $scope, size : 'lg', });
						 */

						var modalInstance = $uibModal
								.open({
									templateUrl : 'views/hrms/dashboard/viewMessage.html',
									controller : ModalInstanceCtrl,
									scope : $scope,
								});
					};
				});