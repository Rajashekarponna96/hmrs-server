angular
		.module('srmt')
		.controller(
				"hallRoomController",
				function($scope, $state, functionHallService, hallRoomService,
						$filter, toaster, countryService, $stateParams,
						employeeService, $localStorage,$uibModal,SweetAlert) {
					
					
					
					$scope.gotoAddHallRoom = function() {
						$state.go('home.crm.addHallRoom');
					};

					$scope.gotoHallRoomsList = function() {
						$state.go("home.crm.hallRoomsList");
					};
					$scope.hallRoomDetail = $stateParams.hallRoom;
					$scope.gotoViewHallRoom = function(hallRoom) {
						$state.go("home.crm.viewHallRoom", {
							hallRoom : hallRoom
						});
					};

					$scope.getFunctionHallsList = function() {
						functionHallService.getFunctionHallsList($scope.page,
								$scope.size).then(function(response) {
							$scope.functionHallsList = response.data;
						})
					}
					$scope.addHallRoom = function(hallRoom) {
						hallRoomService
								.addHallRoom(hallRoom)
								.then(
										function(response) {
											toaster
											.success({
											
												body : 'Added Successfully',
												showCloseButton : true,
												timeout : 4000
											});
											$scope.gotoHallRoomsList();
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
					$scope.page = 0;
					$scope.size = 10;
					$scope.getHallRoomList = function() {
						hallRoomService
								.getHallRoomList($scope.page, $scope.size)
								.then(
										function(response) {
											$scope.hallLRoomsist = response.data;
											$scope.getCount();
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

					$scope.deleteOpen2=function(id){
						
						SweetAlert.swal({
							title : "<span class='glyphicon glyphicon-question-sign fa-4x'></span><br/>Are you sure?",
							text : "You want to delete this!",
							showCancelButton : true,
							confirmButtonColor : "#DD6B55",
							confirmButtonText : "Yes, delete it!",
							cancelButtonText : "No, cancel ",
							closeOnConfirm : false,
							closeOnCancel : false,
							html: true
						}, 
						
						function(isConfirm) {
							if (isConfirm) {
								hallRoomService
								.deleteHallRoom(id).then(
										 function(response) {
								SweetAlert.swal("Deleted!",
										" deleted successfully", "success");
								$scope.getHallRoomList();
										 })
							} else {
								SweetAlert.swal("Cancelled", "Your information is safe",
										"error");
							}
						});
					
		}
					
					

					/*
					 * * pagination logic
					 * 
					 * need to count total page in count menthos need to call
					 * count() in data list method.
					 * 
					 * need to call data list methis in $scope.$watchGroup([
					 * 'page', 'size' ]
					 * 
					 * need to take care about sno neeed to check recods for
					 * page need to check totla records
					 *//*
					 */
					$scope.getCount = function() {
						hallRoomService.getCount().then(
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
						$scope.getHallRoomList();
					});

				})