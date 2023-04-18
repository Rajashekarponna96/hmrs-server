angular.module('srmt').controller(
		"disciplineActionController",
		function($scope, $state, disciplineActionService,disciplineService, $stateParams,Notification,$uibModal) {
			$scope.disciplineActionDetails = $stateParams.disciplineActionData;
			$scope.gotoDisciplineActionList = function(){
				$state.go("home.disciplineActionsList");
			}
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
				$scope.getAllDisciplineActions();
			});

			$scope.getCount = function() {
				disciplineActionService.getCount().then(function(response) {
					$scope.count = response.data;
					$scope.totalPages = Math.ceil($scope.count / $scope.size);
				});
			};

			/**
			 * pagination logic gotoViewLeaveType(leaveType)
			 */

			
			$scope.getAllDisciplineRules = function(){
				disciplineService.findAllDisciplineRules().then(function(response){
					$scope.disciplineRuleList = response.data;
				})
			};			
			$scope.gotoAddDisciplineAction = function() {
				$state.go('home.addDisciplineAction');
			};
			
			$scope.addDisciplineAction = function(disciplineRuleId,discipline){
				disciplineActionService.addDisciplineAction(disciplineRuleId,discipline).then(
						function(response) {
							Notification
							.success({
								message : '<h4><span class="glyphicon glyphicon-ok"></span> Discipline Action added successfully.</h4>',
								positionX : 'center',
								delay : 2000
							});
							$scope.gotoDisciplineActionList();
						},function(error) {
							Notification.error({
								message : '<span class="glyphicon glyphicon-remove-circle"></span>'+error.data.message,
								positionX : 'center',
								delay : 2000
							});
						});
			};
			
			$scope.getAllDisciplineActions = function(){
				disciplineActionService.getDisciplineActions($scope.page, $scope.size).then(
						function(response) {
							$scope.getCount();
							$scope.disciplineList = response.data;
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
			}
			
			$scope.gotoViewDisciplineAction = function(thisdisciplineAction){
				$state.go("home.viewDisciplineAction",{
					disciplineActionData : thisdisciplineAction
				});
			};
			
			$scope.gotoUpdateDisciplineAction = function(thisdisciplineAction){
				$state.go("home.updateDisciplineAction",{
					disciplineActionData : thisdisciplineAction
				});
			};
			
			$scope.updateDisciplineAction = function(ruleId,disciplineAction) {
				
				disciplineActionService
						.updateDisciplineAction(ruleId,
								disciplineAction.id,
								disciplineAction)
						.then(
								function(response) {
									Notification
											.info({
												message : '<h4><span class="glyphicon glyphicon-info-sign"></span> Discipline Action updated successfully.</h4>',
												positionX : 'center',
												delay : 2000
											});
									$scope.gotoDisciplineActionList();
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
									disciplineActionService
											.deleteDisciplineAction(id)
											.then(
													function(response) {
														Notification
																.error({
																	message : '<h4><span class="glyphicon glyphicon-trash"></span> Discipline Action deleted successfully.</h4>',
																	positionX : 'center',
																	delay : 2000
																});
														$scope.getAllDisciplineActions();
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
			};

			
		});