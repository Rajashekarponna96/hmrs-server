angular.module('srmt').controller(
		'actController',
		function($state, $scope, actService, $stateParams, $uibModal,
				$localStorage,toaster) {

			$scope.goToActDetail = function() {
				$state.go('home.actDetail')
			}
			$scope.goToAddActDetail = function() {
				$state.go('home.addAct')
			}
			$scope.actDetail = $stateParams.act;
			$scope.goToEditActDetail = function(act) {
				$state.go('home.editAct', {
					act : act
				})
			}
			$scope.goToViewActDetail = function(act) {
				$state.go('home.viewAct', {
					act : act
				})
			}

			$scope.getActs = function() {
				actService.getActs().then(function(response) {
					$scope.actsList = response.data;
				})
			}

			$scope.addAct = function(act) {
				actService.addAct(act).then(function(response) {
					toaster
					.success({
					
						body : 'Added Successfully',
						showCloseButton : true,
						timeout : 4000
					});
					$scope.goToActDetail();
				}, function(error) {
					toaster.pop({
						type : 'error',
						body : error.data.message,
						showCloseButton : true,
						timeout : 4000
					});

				})
			}

			$scope.deleteAct = function(actId) {
				actService.deleteAct(actId).then(function(response) {
					/*
					 * Notification .error({ message : '<h4><span
					 * class="glyphicon glyphicon-info-sign"></span>Deleted
					 * successfully</h4>', positionX : 'center', delay : 2000
					 * });
					 */
					$scope.getActs();
				}, function(error) {
					/*
					 * Notification.error({ message : '<h4><span
					 * class="glyphicon glyphicon-remove-circle"></span>'+error.data.message+'</h4>',
					 * positionX : 'center', delay : 2000 });
					 */
				})
			};
			$scope.updateAct = function(actdetail) {
				actService.updateAct(actdetail.id, actdetail).then(
						function(response) {
							toaster
							.success({
							
								body : 'Updated Successfully',
								showCloseButton : true,
								timeout : 4000
							});
							$scope.goToActDetail();
						}, function(error) {
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

				modalInstance.result.then(function() {
					actService.deleteAct(id).then(function(response) {
						/*
						 * Notification .error({ message : '<h4><span
						 * class="glyphicon glyphicon-trash"></span> Act
						 * deleted successfully.</h4>', positionX : 'center',
						 * delay : 2000 });
						 */
						$scope.getActs();
					}, function(error) {
						/*
						 * Notification .error({ message : '<span
						 * class="glyphicon glyphicon-remove-circle"></span>' +
						 * error.data.message, positionX : 'center', delay :
						 * 2000 });
						 */
					})
				});
			};

			
		})