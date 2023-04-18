angular
		.module('srmt')
		.controller(
				'actSheduleController',
				function($state, $scope, actSheduleService,
						$stateParams, actService, $uibModal, $localStorage,toaster) {

					$scope.goToActSheduleDetail = function() {
						$state.go('home.actSheduledetail')
					}
					$scope.goToAddActSheduleDetail = function() {
						$state.go('home.addActShedule')
					}
					$scope.actSheduleDetail = $stateParams.actShedule;
					$scope.getActs = function() {
						actService.getActs().then(function(response) {
							$scope.actList = response.data;
						})
					};
					console.log($scope.actSheduleDetail);
					$scope.goToEditActSheduleDetail = function(actShedule) {
						$state.go('home.editActShedule', {
							actShedule : actShedule
						})
					}
					$scope.goToViewActSheduleDetail = function(actShedule) {
						$state.go('home.viewActshedule', {
							actShedule : actShedule
						})
					}

					$scope.getActSchedules = function(actId) {
						$scope.actid = actId;
						actSheduleService.getActShedules(actId).then(
								function(response) {
									$scope.actSheduleList = response.data;
								});
					};

					$scope.addActShedule = function(actShedule) {
						actShedule.act = $scope.act
						actSheduleService
								.addActShedule($scope.act.id, actShedule)
								.then(
										function(response) {
											toaster
											.success({
											
												body : 'Added Successfully',
												showCloseButton : true,
												timeout : 4000
											});
											$scope.goToActSheduleDetail();
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

					$scope.deleteActShedule = function(actSheduleId) {
						actSheduleService
								.deleteActShedule(actSheduleId)
								.then(
										function(response) {
											/*Notification
													.success({
														message : '<h4><span class="glyphicon glyphicon-info-sign"></span>Deleted successfully</h4>',
														positionX : 'center',
														delay : 2000
													});*/
											$scope.getActShedules();
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
					$scope.updateActShedule = function(actSheduleDetail) {

						actSheduleService
								.updateActShedule(
										$scope.actSheduleDetail.act.id,
										actSheduleDetail.id, actSheduleDetail)
								.then(
										function(response) {
											toaster
											.success({
											
												body : 'Updated Successfully',
												showCloseButton : true,
												timeout : 4000
											});
										$scope.goToActSheduleDetail();
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
									actSheduleService
											.deleteActShedule(id)
											.then(
													function(response) {
														/*Notification
																.error({
																	message : '<h4><span class="glyphicon glyphicon-trash"></span> Act Schedule deleted successfully.</h4>',
																	positionX : 'center',
																	delay : 2000
																});
*/														$scope
																.getActSchedules($scope.actid);
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
					

					$scope.getAllActSchedule = function() {
						actSheduleService.getAllactschedules().then(
								function(response) {
									$scope.actSheduleList = response.data;
								});
					};
					
					$scope.init = function() {
						$scope.getAllActSchedule();
						$scope.getActs();
					};

					
					
					$scope.searchActShedules=function(){
						var url="";
						if($scope.act!=undefined){
							url=url+"?actId="+$scope.act.id;
						}
						actSheduleService.searchActShedules(url).then(function(response){
							$scope.actSheduleList=response.data;
						})
					}

				})