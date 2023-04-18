angular
		.module('srmt')
		.controller(
				"bookingInfoController",
				function($scope, $state, toaster, countryService,
						$stateParams, employeeService, $localStorage,
						bookingInfoService, $filter, paymentService,
						uploadService, reportService) {

					
					$scope.gotoUpdateBookingInfo = function() {
						$state.go('home.crm.updateBookingInfo');
					};

					$scope.gotoBookingInfoList = function() {
						$state.go("home.crm.bookingInfo");
					};

					$scope.gotoPaYPayment = function(booking) {
						$state.go("home.crm.addPayment", {
							bookHall : booking
						});
					}

					$scope.viewBookingInfo = function(booking) {
						$state.go("home.crm.viewBookingInfo", {
							bookHall : booking
						});
					};

					$scope.booking = $stateParams.bookHall;
					console.log($scope.booking);

					$scope.updateBookingInfo = function(bookingInfo) {
						rentalChargeService
								.addRentalCharge(rentalCharge)
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

					$scope.init = function() {

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
					$scope.getCount = function(countUrl) {
						bookingInfoService.getCount(countUrl).then(
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
						
						$scope.searchBookinhInfo();
					});

					$scope.getAllBookings = function() {
						bookingInfoService
								.getAllBookings($scope.page, $scope.size)
								.then(
										function(response) {
											$scope.bookingList = response.data;
										},
										function(error) {
											toaster.pop({
												type : 'error',
												body : error.data.message,
												showCloseButton : true,
												timeout : 4000
											});
										});
					}

					/**
					 * pagination logic
					 */

					$scope.gotoUpdateBookingInfo = function(booking) {
						
						
						$state.go("home.crm.updateBookingInfo", {
							bookHall : booking
						});
					};
					$scope.document = {};
					$scope.documnetUploads = function(files) {
						uploadService.uploadDocument(files[0]).success(
								function(response) {
									$scope.document = response;

								}).error(function(error) {
							console.log("error");
						});
					};
					$scope.updateBookFunctionhall = function(booking) {

						if ($scope.document != undefined && booking.weddingCard!=null) {
							booking.weddingCard = $scope.document;
						}
						  	
						if($scope.document!=undefined ){
                            booking.weddingCard = $scope.document;
                        }
                        if($scope.document==undefined)
                        {
                            booking.weddingCard = null;
                        }
						var contactPerson = {

							fisrtName : booking.functionHallEnquiry.customer.fisrtName,
							middleName : booking.functionHallEnquiry.customer.middleName,
							lastName : booking.functionHallEnquiry.customer.lastName,
							mobile : booking.functionHallEnquiry.customer.mobile,
							email : booking.functionHallEnquiry.customer.email,
							panNumber : booking.functionHallEnquiry.customer.panNumber,
							address : booking.functionHallEnquiry.customer.address
						};

						booking.functionHallEnquiry.customer = contactPerson;

						bookingInfoService
								.updateBooking(booking.id, booking)
								.then(
										function(response) {
											toaster
											.success({
											
												body : 'Updated Successfully',
												showCloseButton : true,
												timeout : 4000
											});
											$scope.gotoBookingInfoList();
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
					$scope.open2 = function() {
						$scope.popup2.opened = true;
					};
					$scope.popup1 = {
						opened : false
					};
					$scope.popup2 = {
						opened : false
					};
					var that = this;
					// console.log($scope.payment.checue_DDDate);
					$scope.payPayment = function(payment) {
						console.log(payment.checue_DDDate);
						/*
						 * payment.checue_DDDate =
						 * $filter("date")(payment.checue_DDDate,"dd-MM-yyyy");
						 */
						payment.checue_DDDate = $filter('date')(
								payment.checue_DDDate, 'dd-MM-yyyy');
						payment.booking = $scope.booking;
						paymentService
								.payPayment(payment)
								.then(
										function(response) {
											toaster
											.success({
											
												body : 'Payment Added Successfully',
												showCloseButton : true,
												timeout : 4000
											});
											$scope.gotoBookingInfoList();
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

					var that = this;

					$scope.dates = {

						date3 : new Date(),

					};

					$scope.open = {

						date3 : false,

					};

					// Disable today selection
					$scope.disabled = function(date, mode) {
						return (mode === 'day' && (new Date().toDateString() == date
								.toDateString()));
					};

					$scope.dateOptions = {
						showWeeks : false,
						startingDay : 1
					};

					$scope.timeOptions = {
						readonlyInput : false,
						showMeridian : false
					};

					$scope.dateModeOptions = {
						minMode : 'year',
						maxMode : 'year'
					};

					$scope.openCalendar = function(e, date) {
						$scope.open[date] = true;
					};

					// watch date4 and date5 to calculate difference
					var unwatch = $scope.$watch(function() {
						return that.dates;
					}, function() {
					}, true);

					$scope.$on('$destroy', function() {
						unwatch();
					});

					$scope.searchBookinhInfo = function() {
						var url = "?"
							console.log($scope.fromDateTime);
						if ($scope.fromDateTime != undefined && $scope.fromDateTime!='') {
							$scope.fromDateTime = $filter('date')(
									$scope.fromDateTime, 'dd-MM-yyyy HH:mm:ss');
							url = url + "fromTime=" + $scope.fromDateTime + "&";
						}
						if ($scope.toDateTime != undefined) {
							$scope.toDateTime = $filter('date')(
									$scope.toDateTime, 'dd-MM-yyyy HH:mm:ss');
							url = url + "toTime=" + $scope.toDateTime + "&";
						}
						if ($scope.phoneNumber != undefined) {

							url = url + "mobile=" + $scope.phoneNumber + "&";
						}

						if ($scope.purpose != undefined) {
							url = url + "functionType=" + $scope.purpose + "&";
						}

						var countUrl = url;
						dataurl = url + "page=" + $scope.page + "&size="
								+ $scope.size;
						bookingInfoService.searchBookinhInfo(dataurl).then(
								function(response) {
									$scope.bookingList = response.data;
									$scope.getCount(countUrl);
									$scope.clearnow();
								})
					}

					$scope.clearnow = function() {
						$scope.requiredDate = undefined;
						$scope.phoneNumber = undefined;
						$scope.purpose = undefined;
					}

					// //date time
					var that = this;
					
					

					$scope.dates = {
						date3 : new Date(),
					};

					$scope.open = {
						date1 : false,
						date2 : false,
						date3 : false
					};

					// Disable today selection
					$scope.disabled = function(date, mode) {
						return (mode === 'day' && (new Date().toDateString() == date
								.toDateString()));
					};
					$scope.dateOptions = {
						showWeeks : false,
						startingDay : 1
					};

					$scope.timeOptions = {
						readonlyInput : false,
						showMeridian : false
					};

					$scope.dateModeOptions = {
						minMode : 'year',
						maxMode : 'year'
					};

					$scope.openCalendar = function(e, date) {
						$scope.open[date] = true;
					};

					// watch date4 and date5 to calculate difference
					var unwatch = $scope.$watch(function() {
						return that.dates;
					}, function() {
					}, true);

					$scope.$on('$destroy', function() {
						unwatch();
					});

					$scope.printBookingInfo = function(id) {
						reportService.bookingFormPrint(id).then(
								function(response) {
									var file = new Blob([ response.data ], {
										type : 'application/pdf'
									});
									var fileURL = URL.createObjectURL(file);
									window.open(fileURL);
								})
					};
					$scope.docPath = function(path) {
						var imagepath = uploadService.imagePath(path);
						return imagepath;
					};	
					$scope.mindate = new Date();
					
					$scope.date = moment();
					$scope.resetSearch = function(){
						$scope.fromDateTime =undefined;
						$scope.toDateTime = undefined;
						$scope.phoneNumber = undefined;
						$scope.purpose = undefined;
					}
				});