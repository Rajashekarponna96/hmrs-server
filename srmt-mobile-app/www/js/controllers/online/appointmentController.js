angular.module('srmt').controller(
		"appointmentController",
		function($scope, $state, onlineCountryService, onlineStateService,
				onlineDistrictService, onlineInventoryService, $localStorage,
				appointmentServiceOnline, clientServiceOnline,
				onlinePersonalInfoService, $stateParams) {
			$scope.appointmentDetails = $stateParams.appointment;
			$scope.getAllCountries = function() {
				onlineCountryService.getCountries().then(function(response) {
					$scope.countryList = response.data;
				})
			};
			$scope.customerList = [];
			$scope.getStatesByCountryId = function(countryId) {
				onlineStateService.getStates(countryId).then(
						function(response) {
							$scope.stateList = response.data;
						})
			};

			$scope.getDistrictsByStateId = function(stateId) {
				onlineDistrictService.getDistricts(stateId).then(
						function(response) {
							$scope.districtList = response.data;
						})
			};

			$scope.getLocationsAndVehicleModelsByEmployeeId = function() {
				onlineInventoryService
						.getLocationsAndVehicleModelsByEmployeeId(
								$localStorage.loginId).then(function(response) {
							$scope.vehicleModels = response.data.vehicleModels;
							$scope.locations = response.data.locations;
						})
			}
			onlinePersonalInfoService.getSalesRepresentative(
					$localStorage.loginId).then(function(response) {
				// console.log("fetching sales rep");
				$scope.salesRepresentative = response.data;
				// console.log($scope.salesRepresentative);

			})
			var models = [];
			$scope.customer={};
			$scope.addAppointment = function(customer) {
				
				console.log($scope.customer.homePhone);
				console.log($scope.vehicleModel);
				customer.vehicleModel = $scope.vehicleModel;
				customer.employee = $scope.salesRepresentative;
				clientServiceOnline.addClient(customer).then(
						function(response) {
							alert("customer added successfully");
						}, function(error) {
							alert("failed");
						})
			};

			$scope.loginId = $localStorage.loginId;

			$scope.page = 0;
			$scope.size = 10;
			$scope.getCount = function() {
				clientServiceOnline.getCustomersCount().then(
						function(response) {
							$scope.count = response.data;
							$scope.totalPages = Math.ceil($scope.count
									/ $scope.size);
						})
			};

			$scope.getAppointments = function() {
				console.log("in get customers");
				appointmentServiceOnline.getAppointmentList(
						$localStorage.loginId, $scope.page, $scope.size).then(
						function(response) {
							$scope.appointmentList = response.data;
						})
			};
			$scope.init = function() {
				$scope.getAppointments();
			};

			$scope.gotoViewAppointment = function(customer) {
				console.log("in view appointment");
				$state.go("app.viewAppointment", {
					appointment : customer
				})
			};

			$scope.gotoAppointmentList = function() {
				$state.go("app.appointments");
			}

		})