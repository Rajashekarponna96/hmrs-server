angular.module('srmt').controller(
		"workshopController",
		function($scope, $state, workshopService, personalService, $stateParams,
				$localStorage, LocationService, toaster ) {

			$scope.gotoWorkshopList = function() {
				$state.go('home.workshop.workshoplist');
			}

			$scope.gotoAddWorkshop = function() {
				$state.go('home.workshop.addWorkshop');
			}

			$scope.workshopDetails = $stateParams.workshop;
			$scope.gotoUpadeWorkshop = function(workshop) {
				$state.go('home.workshop.updateWorkshop',{
					workshop : workshop
				}); 
					
			}

			$scope.gotoViewWorkshop = function(workshop) {
				$state.go('home.workshop.viewWorkshop',{
					workshop : workshop
				});
			};
			
			$scope.PerPage = 10;
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
			}

			$scope.$watchGroup([ 'page', 'size' ], function(newVal, oldVal) {
				$scope.searchWorkShop();
			});

			$scope.getCount = function(url) {
				workshopService.getCount(url).then(function(response) {
					$scope.count = response.data;
					$scope.totalPages = Math.ceil($scope.count / $scope.size);
				});
			};

			/**
			 * pagination logic
			 */
			
			$scope.init=function(){
				$scope.getAllEmployees();
				$scope.getAllLocations();
			}
			
			$scope.getAllEmployees = function() {
				personalService.getAllActiveEmployees().then(
						function(response) {
							$scope.employeeList = response.data;

						})
			};
			$scope.getAllLocations = function() {
				LocationService.getAlltLocations().then(
						function(response) {
							$scope.locationList = response.data;
						})
			};
			
			$scope.addWorkshop = function(workshop){
				workshopService.addWorkshop(workshop).then(function(response){
					toaster
					.success({
					
						body : 'Workshop Added Successfully.',
						showCloseButton : true,
						timeout : 4000
					});

					
					$scope.gotoWorkshopList();
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
			
			$scope.updateWorkshop = function(workshop){
				workshopService.updateWorkshop(workshop.id, workshop).then(function(response){
					toaster
					.success({
					
						body : 'Workshop Updated Successfully.',
						showCloseButton : true,
						timeout : 4000
					});

					
					$scope.gotoWorkshopList();
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
			
			
			$scope.searchWorkShop=function(){
				var url = "?"
				if ($scope.code != undefined) {
					url = url + "code=" +$scope.code
							+ "&";
				}
				if ($scope.location != undefined) {
					url = url + "locationId=" +$scope.location.id
							+ "&";
				}
				var countUrl = url;
				countUrl = countUrl.substr(0, countUrl.length - 1);
				var dataurl = url + "page=" + $scope.page + "&size="
						+ $scope.size;
				
				workshopService.searchWorkShop(dataurl).then(function(response){
					$scope.workshopList=response.data;
					$scope.getCount(countUrl);
				})
			}
			
		})