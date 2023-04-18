angular
		.module('srmt')
		.controller(
				"location_wiseActController",
				function($scope, $state, $uibModal, location_wiseActService,
						 $stateParams, actService,
						actSheduleService, LocationService, $filter,
						locationDepartmentService, $localStorage,toaster) {
					
					
						
						$scope.init=function(){
						getActs();
						//getAlltLocations();
						getActSchedules()
						
					}

					$scope.locationWiseActDetail = $stateParams.locationWiseAct;
					
					

					console.log($scope.locationWiseActDetail);

					$scope.gotoLocation_wiseActList = function() {
						$state.go('home.locationwiseActList');
					};
					$scope.gotoUpdateLocation_wiseAct = function(locationWiseAct) {
						$state.go('home.updateLocation_wiseAct', {
							locationWiseAct : locationWiseAct
						});
					};
					$scope.gotoAddLocation_wiseAct = function() {
						$state.go('home.addLocation_wiseAct');
					};
					$scope.viewLocation_wiseAct = function(locationWiseAct) {
						$state.go("home.viewLocationWiseAct", {
							locationWiseAct : locationWiseAct
						});
					};
					$scope.page = 0;
					$scope.size = 10;
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
					}

					$scope.$watchGroup([ 'page', 'size' ], function(newVal,
							oldVal) {
						$scope.searchLocationWiseActs();
					});

					$scope.getCount = function(countUrl) {
						location_wiseActService.getCount(countUrl).then(
								function(response) {
									$scope.count = response.data;
									$scope.totalPages = Math.ceil($scope.count
											/ $scope.size);
								});
					};

					/**
					 * pagination logic
					 */
					/*$scope.getLocationwiseAct = function() {
						locationDepartmentService.getLocationDepartments(
								$scope.page, $scope.size).then(
								function(response) {
									$scope.locActList = response.data;
								});
					};*/

					$scope.addLocationDepartment = function(act, dept) {
						act.effectiveDate = $filter('date')(act.effectiveDate,
								'dd-MM-yyyy');

						dept.actShedule = act.actShedule;
						dept.location = act.location;
						dept.effectiveDate = act.effectiveDate;
						dept.basic = act.basic;
						dept.da = act.da;

						location_wiseActService
								.addLocationWiseAct(dept)
								.then(
										function(response) {

											toaster
											.success({
											
												body : 'Added Successfully',
												showCloseButton : true,
												timeout : 4000
											});

											$scope.gotoLocation_wiseActList();
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

					

					$scope.addLocationWiseActMapping = function(department,schedule) {
						department.effectiveDate = $filter('date')(
								department.effectiveDate, 'dd-MM-yyyy');

						location_wiseActService
								.addLocationWiseActMapping(department.id,
										schedule.id, department)
								.then(
										function(response) {

											toaster
											.success({
											
												body : 'Added Successfully',
												showCloseButton : true,
												timeout : 4000
											});

											$scope.gotoLocation_wiseActList();
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

					$scope.getLocationWiseActsWithPagination = function() {
						location_wiseActService
								.getLocationWiseActsWithPagination($scope.page,
										$scope.size)
								.then(
										function(response) {
											$scope.locationWiseActsList = response.data;
											$scope.getCount();
										})
					}

					/* date picker */
					$scope.clear = function() {
					};
					$scope.clearupdate = function() {
					};
					$scope.dateOptions = {
						startingDay : 1
					};

					$scope.open1 = function() {
						$scope.popup1.opened = true;
					};
					$scope.popup1 = {
						opened : false
					};
					
					
										
					$scope.getActs=function(){
						actService.getActs().then(function(response){
							$scope.actList=response.data;
						})
					}
					
					$scope.getAlltLocations = function() {
						LocationService.getAlltLocations().then(
								function(response) {
									$scope.locationList = response.data;
								})
					}
					$scope.getDepartmentsByLocation = function(locationId) {
						locationDepartmentService.getAllLocationDepartments(locationId).then(
								function(response) {
									$scope.departmentList = response.data;

								});
					}
					$scope.init=function(){
						$scope.getActs();
						$scope.getAlltLocations();
					}
					
					$scope.searchLocationWiseActs=function(){
						
						var url="?"
							if($scope.act!=undefined){
								url=url+"actId="+$scope.act.id+"&"
							}
						if($scope.location!=undefined){
							url=url+"locationId="+$scope.location.id+"&"
						}
						if($scope.department!=undefined){
							url=url+"departmentId="+$scope.department.id+"&"
						}
						
						countUrl=url;
						countUrl=countUrl.substr(0,countUrl.length-1);
						url=url+"page="+$scope.page+"&size="+$scope.size;
						location_wiseActService.searchLocationWiseActs(url).then(function(response){
							$scope.locationWiseActsList=response.data;
							$scope.getCount(countUrl);
						})
					}


					$scope.getActSchedules = function(actId) {
						$scope.actid = actId;
						actSheduleService.getActShedules(actId).then(
								function(response) {
									$scope.actSheduleList = response.data;
								});
					};
					
					


					
				});