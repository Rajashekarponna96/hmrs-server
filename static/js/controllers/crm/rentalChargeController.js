angular
		.module('srmt')
		.controller(
				"rentalChargeController",
				function($scope, $state, rentalChargeService,
						functionHallService, $filter, notify,
						countryService, $stateParams, employeeService,
						$localStorage, reportService ,toaster) {
					
					
					

					$scope.gotoRentalChargeList = function() {
						$state.go("home.crm.rentalChargeList");
					};

					$scope.rentalChargeDetails = $stateParams.rentalCharge;
					console.log($scope.rentalChargeDetails);
					$scope.addRentalCharge = function(rentalCharge) {
						rentalCharge.hallRentPerDay.currency='INR';
						rentalCharge.roomRentPerDay.currency='INR';
						rentalCharge.electricityChargePerUnit.currency='INR';
						rentalCharge.cleaningCharges.currency='INR';
						rentalCharge.generatorRentPerHour.currency='INR';
						
						rentalChargeService
								.addRentalCharge(rentalCharge)
								.then(
										function(response) {
											toaster
											.success({
											
												body : 'Added Successfully',
												showCloseButton : true,
												timeout : 4000
											});
											$scope.gotoRentalChargeList();
										},
										function(error) {
											toaster.pop({
												type : 'error',
												body : error.data.message,
												showCloseButton : true,
												timeout : 4000
											});								})
					};

					$scope.getAllFunctionHalls = function() {
						functionHallService
								.getAllFunctionHalls()
								.then(
										function(response) {
											$scope.hallList = response.data;
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

					

					/* date picker */

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

					
					$scope.gotoUpdateRentalCharge = function(thisrentalCharge) {
						
						$state.go("home.crm.updateRentalCharge", {
							rentalCharge : thisrentalCharge
						});
					};

					$scope.viewRentalCharge = function(thisrentalCharge) {
						$state.go("home.crm.viewRentalCharge", {
							rentalCharge : thisrentalCharge
						});
					};

					$scope.updateRentalCharge = function(rentalCharge) {
						rentalCharge.hallRentPerDay.currency='INR';
						rentalCharge.roomRentPerDay.currency='INR';
						rentalCharge.electricityChargePerUnit.currency='INR';
						rentalCharge.cleaningCharges.currency='INR';
						rentalCharge.generatorRentPerHour.currency='INR';
						rentalChargeService
								.updateRentalCharge(rentalCharge)
								.then(
										function(response) {
											toaster
											.success({
											
												body : 'Updated Successfully',
												showCloseButton : true,
												timeout : 4000
											});

											$scope.gotoRentalChargeList();
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
					$scope.rentalcardReport = function() {
						console.log("in print method");
						reportService.rentalChargeList().then(
								function(response) {
									var file = new Blob([ response.data ], {
										type : 'application/pdf'
									});
									var fileURL = URL.createObjectURL(file);
									window.open(fileURL);
								})
					};

				})