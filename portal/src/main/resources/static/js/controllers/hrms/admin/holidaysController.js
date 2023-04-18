angular
		.module('srmt')
		.controller(
				'holidaysController',
				function($scope, $state, holidayService, leavePeriodService,
						lookupService, divisionalDetailsService, $stateParams,
						$uibModal, $filter, LocationService, $localStorage,countryService,
						notify, toaster) {

					$scope.getAlltLocations = function() {
						LocationService.getAlltLocations().then(
								function(response) {
									$scope.locationList = response.data;
								})
					}
					
					$scope.getCountries = function() {
						countryService.getCountries().then(function(response) {
							$scope.countriesList = response.data;
						})
					}

					$scope.init = function() {
						$scope.getAllHolidays();
						$scope.getAllLeavePeriods();
						

					}

					$scope.holidayDetails = $stateParams.holidayData;
					console.log($scope.holidayDetails);
					if ($scope.holidayDetails != undefined) {
						$scope.fullDate = $scope.holidayDetails.leavePeriod.startDate
								+ " To "
								+ $scope.holidayDetails.leavePeriod.endDate;
					}

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
					$scope.getCount = function() {
						holidayService.getCount().then(
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
						$scope.getAllHolidays();
					});

					/**
					 * pagination logic
					 */

					console.log("in holiday controllelr");
					$scope.gotoAddHoliday = function() {
						$state.go('home.addHoliday');
					};

					$scope.gotoUpdateHoliday = function(thisholidayData) {

						// thisholidayData.holidayDate =
						// $filter('datepreselect')(thisholidayData.holidayDate);

						$state.go('home.updateHoliday', {
							holidayData : thisholidayData
						});

					};

					$scope.gotoHolidaysList = function() {
						$state.go('home.holidaysList');
					};
					$scope.viewHoliday = function(thisholidayData) {
						$state.go('home.viewHoliday', {
							holidayData : thisholidayData
						});
					};

					$scope.getAllHolidays = function() {
						$scope.getCount();
						holidayService
								.getHolidaysList($scope.page, $scope.size)
								.then(function(response) {
									$scope.holidayList = response.data;
								}, function(error) {
									toaster.pop({
										type : 'error',
										body : error.data.message,
										showCloseButton : true,
										timeout : 4000
									});
								})

					};

					$scope.addHoliday = function() {
						/*
						 * holiday.holidayDate = $filter('date')(
						 * holiday.holidayDate, 'dd-MM-yyyy');
						 */

						holidayService.addHoliday($scope.location.id,
								$scope.leavePeriod.id, $scope.ListOfHolidays)
								.then(function(response) {
									toaster.success({

										body : 'Added Successfully',
										showCloseButton : true,
										timeout : 4000
									});
									$scope.gotoHolidaysList();
								}, function(error) {
									$scope.clear();
									toaster.pop({
										type : 'error',
										body : error.data.message,
										showCloseButton : true,
										timeout : 4000
									});
								})
					};

					$scope.updateHoliday = function(holiday) {
						/*
						 * holiday.holidayDate = $filter('date')(
						 * holiday.holidayDate, 'dd-MM-yyyy');
						 */
						console.log("id is: "
								+ $scope.holidayDetails.leavePeriod.id);
						holidayService.updateHoliday(holiday.location.id,
								holiday.leavePeriod.id, holiday.id, holiday)
								.then(function(response) {
									toaster.success({

										body : 'Updated Successfully',
										showCloseButton : true,
										timeout : 4000
									});
									$scope.gotoHolidaysList();
								}, function(error) {
									$scope.clearupdate();
									toaster.pop({
										type : 'error',
										body : error.data.message,
										showCloseButton : true,
										timeout : 4000
									});
								})
					};

					$scope.deleteHoliday = function(id) {
						holidayService.deleteHoliday(id).then(
								function(response) {
									/*
									 * Notification .success({ message : '<h4><span
									 * class="glyphicon glyphicon-info-sign"></span>Updated
									 * successfully</h4>', positionX :
									 * 'center', delay : 2000 });
									 */
									$scope.getAllHolidays();
								})
					}

					/* Look up methods */

					$scope.getAllLeavePeriods = function() {
						leavePeriodService.getAllLeavePeriodsList().then(
								function(response) {

									$scope.leavePeriodList = response.data;
								});
					};

					$scope.getAllStates = function(countryId) {
						lookupService.getStates(countryId).then(function(response) {

							$scope.stateList = response.data;
						});
					};

					$scope.getAllDivisions = function() {
						divisionalDetailsService.getAllDivisionalDetails(0, 5)
								.then(function(response) {

									$scope.divisionList = response.data;
								});
					};

					$scope.deleteOpen = function(id) {
						$scope.delId = id;
						var modalInstance = $uibModal.open({

							templateUrl : 'myModalContent.html',
							controller : 'ModalInstanceCtrl',

						});

						modalInstance.result.then(function() {
							holidayService.deleteHoliday(id).then(
									function(response) {
										/*
										 * Notification .error({ message : '<h4><span
										 * class="glyphicon glyphicon-trash"></span>
										 * Holiday deleted successfully.</h4>',
										 * positionX : 'center', delay : 2000
										 * });
										 */
										$scope.getAllHolidays();
									}, function(error) {
										/*
										 * Notification .error({ message : '<span
										 * class="glyphicon
										 * glyphicon-remove-circle"></span>' +
										 * error.data.message, positionX :
										 * 'center', delay : 2000 });
										 */
									})
						});
					};

					$scope.size = 10;
					$scope.page = 0;
					$scope.searchHolidayByLeavePeriodIdAndStateId = function(
							leavePeriod, state) {

						var url = "?";
						if (leavePeriod != undefined && leavePeriod != "") {
							url = url + "periodid=" + leavePeriod.id + "&";
						}
						if (state != undefined && leavePeriod != "") {
							url = url + "stateId=" + state.id + "&";
						}
						var CountUrl = url;

						url = url + "page=" + $scope.page + "&size="
								+ $scope.size;
						holidayService
								.searchByLeavePeriodIdAndStateId(url)
								.then(
										function(response) {
											$scope.holidayList = response.data;
											$scope
													.searchHolidayByLeavePeriodIdAndStateIdCount(CountUrl);
										});

					};
					$scope.searchHolidayByLeavePeriodIdAndStateIdCount = function(
							url) {

						var finalUrl = url.substring(0, url.length - 1);
						holidayService.searchByLeavePeriodIdAndStateIdCount(
								finalUrl).then(
								function(response) {
									$scope.count = response.data;
									$scope.totalPages = Math.ceil($scope.count
											/ $scope.size);
								});

					};

					/* date picker */

					/* date picker */
					$scope.holiday = {
						holidayDate : ''
					};
					$scope.clear = function() {
						$scope.holiday.holidayDate = '';
					};
					$scope.clearupdate = function() {
						$scope.holidayDetails.holidayDate = '';
					};
					$scope.dateOptions = {
						startingDay : 1
					};

					$scope.open1 = function() {
						$scope.popup1.opened = true;
					};
					$scope.open2 = function() {
						$scope.popup2.opened = true;
					};
					$scope.popup1 = {
						opened : false
					};
					$scope.popup2 = {
						opened : false
					};

					$scope.ListOfHolidays = [];
					$scope.addHolidayDetail = function() {
						$scope.holiday.holidayDate = $filter('date')(
								$scope.holiday.holidayDate, 'dd-MM-yyyy');
						console.log($scope.holiday);
						console.log($scope.leavePeriod);
						if ($filter('datepreselect')
								($scope.holiday.holidayDate) >= $filter(
								'datepreselect')($scope.leavePeriod.startDate)
								&& $filter('datepreselect')(
										$scope.holiday.holidayDate) <= $filter(
										'datepreselect')(
										$scope.leavePeriod.endDate)) {
							$scope.ListOfHolidays
							.push(angular.copy($scope.holiday));
					$scope.holiday = {};
							
						}
						else{
							toaster
							.pop({
								type : 'error',
								body : 'Holiday Date Must Be In between LeavePeriod',
								showCloseButton : true,
								timeout : 5000
							});
						}
						
					}

					$scope.deleteHolidayOpen = function(index) {
						$scope.ListOfHolidays.splice(index, 1);
					}

				}).controller(
				'ModalInstanceCtrl',
				function($scope, $uibModalInstance, $localStorage) {

					$scope.ok = function() {
						$uibModalInstance.close();
					};

					$scope.cancel = function() {
						$uibModalInstance.dismiss('cancel');
					};

					

				});