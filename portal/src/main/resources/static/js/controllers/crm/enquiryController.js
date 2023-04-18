angular
		.module('srmt')
		.controller(
				"enquiryController",
				function($scope, $state, toaster, $filter, bookingInfoService,
						lookupService, $stateParams, functionHallService,
						employeeService, $localStorage,
						functionHallEnquiryService, uploadService) {

					
					$scope.gotoAddEnquiry = function() {
						$state.go('home.crm.addEnquiry');
					};

					$scope.gotoEnquiryList = function() {
						$state.go("home.crm.enquiryList");
					};

					$scope.gotoBookingInfoList = function() {
						$state.go("home.crm.bookingInfo");
					};
					$scope.gotoViewEnquiry = function(enquiry) {
						$state.go("home.crm.viewEnquiry", {
							enquiry : enquiry
						});
					};
					$scope.enquiryDetail = $stateParams.enquiry;
					console.log($scope.enquiryDetail);
					console.log($scope.fromDateTime);
					// $scope.bookingDetails=$stateParams.enquiry;

					$scope.gotoAddBookingInfo = function(enquiry) {

						$state.go("home.crm.bookHall", {
							enquiry : enquiry
						});
					};

					/*
					 * LOOKUP METHODS
					 */

					$scope.getCountries = function() {
						lookupService.getCountries().then(
								function(response) {
									$scope.countriesList = response.data;
									$scope.bookingDate = $filter('date')(
											new Date(), 'dd-MM-yyyy');
								})
					}
					$scope.getStates = function(countryId) {
						console.log(countryId);
						// console.log($scope.organization.address.state.id);
						lookupService.getStates(countryId).then(
								function(response) {
									$scope.statesList = response.data;
								})
					}
					$scope.getDistricts = function(stateId) {
						lookupService.getDistricts(stateId).then(
								function(response) {
									$scope.districtList = response.data;
								})
					}
					$scope.getCities = function(districtId) {
						lookupService.getCities(districtId).then(
								function(response) {
									$scope.citiesList = response.data;
								})
					}
					$scope.searchLookupCountries = function() {
						$scope
								.getStates($scope.enquiryDetail.customer.address.country.id);
						$scope
								.getDistricts($scope.enquiryDetail.customer.address.state.id);
					}

					// //End of Look ups

					console.log($scope.enquiryDetail);
					if ($scope.enquiryDetail != undefined) {
						$scope.searchLookupCountries();
					}

					$scope.gotoupdateEnquiry = function(enquiry) {

						
						var customer = {
							fisrtName : enquiry.customer.fisrtName,
							middleName : enquiry.customer.middleName,
							lastName : enquiry.customer.lastName,
							mobile : enquiry.customer.mobile,
							email : enquiry.customer.email,
							panNumber : enquiry.customer.panNumber,
							address : enquiry.customer.address

						}
						enquiry.customer = customer;
						if (enquiry.functionHall.contactPerson != null) {
							var contactPerson = {

								fisrtName : enquiry.functionHall.contactPerson.fisrtName,
								middleName : enquiry.functionHall.contactPerson.middleName,
								lastName : enquiry.functionHall.contactPerson.lastName,
								mobile : enquiry.functionHall.contactPerson.mobile,
								email : enquiry.functionHall.contactPerson.email,
								panNumber : enquiry.functionHall.contactPerson.panNumber,
								address : enquiry.functionHall.contactPerson.address
							}
							enquiry.functionHall.contactPerson = contactPerson;
						}

						$state.go('home.crm.updateEnquiry', {
							enquiry : enquiry
						});
					};

					$scope.updateFunctionHallEnquiry = function(
							functionHallEnquiry) {

						var contactPerson = {

							fisrtName : functionHallEnquiry.functionHall.contactPerson.fisrtName,
							middleName : functionHallEnquiry.functionHall.contactPerson.middleName,
							lastName : functionHallEnquiry.functionHall.contactPerson.lastName,
							mobile : functionHallEnquiry.functionHall.contactPerson.mobile,
							email : functionHallEnquiry.functionHall.contactPerson.email,
							panNumber : functionHallEnquiry.functionHall.contactPerson.panNumber,
							address : functionHallEnquiry.functionHall.contactPerson.address
						}
						functionHallEnquiry.functionHall.contactPerson = contactPerson;
						functionHallEnquiry.enquiredOn = $filter('date')(
								functionHallEnquiry.enquiredOn, 'dd-MM-yyyy');
						functionHallEnquiry.requiredToDate = $filter('date')(
								functionHallEnquiry.requiredToDate,
								'dd-MM-yyyy');
						functionHallEnquiry.requiredFromDate = $filter('date')(
								functionHallEnquiry.requiredFromDate,
								'dd-MM-yyyy');
						functionHallEnquiryService.updateFunctionHallEnquiry(
								functionHallEnquiry.id, functionHallEnquiry)
								.then(function(response) {
									toaster.success({

										body : 'Added Successfully',
										showCloseButton : true,
										timeout : 4000
									});
									$scope.gotoEnquiryList();
								}, function(error) {
									toaster.pop({
										type : 'error',
										body : error.data.message,
										showCloseButton : true,
										timeout : 4000
									});

								})
					};
					/* date picker */
					$scope.holiday = {
						holidayDate : ''
					};
					$scope.clear = function() {
					};
					$scope.clearupdate = function() {
					};
					$scope.dateOptions = {
						startingDay : 1
					};

					$scope.page = 0;
					$scope.size = 10;
					$scope.getFunctionHallsList = function() {
						functionHallService.getAllFunctionHalls().then(function(response) {
							$scope.functionHallsList = response.data;
						})
					};

					$scope.enquiry = {
						requiredToDate : '',
						requiredFromDate : ''
					};
					$scope.validate = function() {
						
					}

					$scope.addFunctionHallEnquiry = function(enquiry) {

						var contactPerson = {
							fisrtName : enquiry.functionHall.contactPerson.fisrtName,
							middleName : enquiry.functionHall.contactPerson.middleName,
							lastName : enquiry.functionHall.contactPerson.lastName,
							mobile : enquiry.functionHall.contactPerson.mobile,
							homePhone : enquiry.functionHall.contactPerson.homePhone

						}
						console.log(enquiry.requiredFromDate + "\n\n");
						console.log(enquiry.requiredToDate);
						
						enquiry.bookingStatus = 'pending';
						enquiry.functionHall.contactPerson = contactPerson;
						if (enquiry.purpose == 'Other') {
							if ($scope.functionName != null
									|| $scope.functionName != undefined) {
								enquiry.purpose = $scope.functionName;
							}
						}
						functionHallEnquiryService.addFunctionHallEnquiry(
								enquiry).then(function(response) {
							toaster.success({

								body : 'Added Successfully',
								showCloseButton : true,
								timeout : 4000
							});
							$scope.gotoEnquiryList();
						}, function(error) {
							toaster.pop({
								type : 'error',
								body : error.data.message,
								showCloseButton : true,
								timeout : 4000
							});

						})

					};
					/*$scope.getFunctionHallEnquiriesList = function() {
						functionHallEnquiryService
								.getFunctionHallEnquiriesList($scope.page,
										$scope.size).then(function(response) {
									$scope.enquiryList = response.data;
									// $scope.getCount();

								})
					}*/
					$scope.getFunctionHallEnquiriesList = function() {
						functionHallEnquiryService
								.getAllFunctionHallEnquiriesSortByDate($scope.page,
										$scope.size).then(function(response) {
									$scope.enquiryList = response.data;
									// $scope.getCount();

								})
					}


					$scope.init = function() {
						$scope.getEmployeeList();
					};

					$scope.BookFunctionhall = function(booking) {

						booking.fromDateTime = $scope.enquiryDetail.requiredFromDate;
						booking.toDateTime = $scope.enquiryDetail.requiredToDate;
						if ($scope.document != undefined) {
							booking.weddingCard = $scope.document;
						}
						if ($scope.document == undefined) {
							booking.weddingCard = null;
						}
						bookingInfoService
								.BookFunctionhall($scope.enquiryDetail.id,
										booking)
								.then(
										function(response) {
											toaster
													.success({

														body : 'Booking Added Successfully',
														showCloseButton : true,
														timeout : 4000
													});
											$scope.enquiryDetail.bookingStatus = 'confirm';
											$scope.gotoEnquiryList();
										}, function(error) {
											toaster.pop({
												type : 'error',
												body : error.data.message,
												showCloseButton : true,
												timeout : 4000
											});

										})
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
					$scope.getCount = function(dataUrl) {
						functionHallEnquiryService.getCount(dataUrl).then(
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
						$scope.searchEnquiry();
					});

					$scope.document = {};
					$scope.documnetUploads = function(files) {
						uploadService.uploadDocument(files[0]).success(
								function(response) {
									$scope.document = response;

								}).error(function(error) {
							console.log("error");
						});
					};

					$scope.getDocumnets = function() {
						if ($scope.person != undefined) {
							documnetService.getDocumnets($localStorage.loginId,
									"Address").then(function(response) {
								$scope.documentsList = response.data;
							})
						} else
							return null;

					}

					$scope.docPath = function(path) {
						var imagepath = uploadService.imagePath(path);
						return imagepath;
					};

					$scope.searchEnquiry = function() {
						if ($filter('datepreselect')($scope.enquiryDate) <= $filter(
								'datepreselect')($scope.enquiryToDate)) {
							var url = "?"
							if ($scope.enquiryDate != undefined) {
								/*
								 * $scope.enquiryDate = $filter('date')(
								 * $scope.enquiryDate, 'dd-MM-yyyy');
								 */
								url = url + "enquiryFromDate="
										+ $scope.enquiryDate + "&";
							}

							if ($scope.enquiryToDate != undefined) {
								/*
								 * $scope.requiredDate = $filter('date')(
								 * $scope.requiredDate, 'dd-MM-yyyy');
								 */
								url = url + "enquiryToDate="
										+ $scope.enquiryToDate + "&";
							}

							if ($scope.functionHall != undefined) {
								url = url + "hallId=" + $scope.functionHall.id
										+ "&";
							}

							if ($scope.phoneNumber != undefined) {
								url = url + "mobile=" + $scope.phoneNumber
										+ "&";
							}

							var countUrl = url;
							countUrl = countUrl.substr(0, countUrl.length - 1);
							dataurl = url + "page=" + $scope.page + "&size="
									+ $scope.size;
							functionHallEnquiryService.searchEnquiry(dataurl)
									.then(function(response) {
										$scope.enquiryList = response.data;
										$scope.getCount(countUrl);
										/* $scope.clear(); */
									})
						}
						if ($filter('datepreselect')($scope.enquiryDate) > $filter(
								'datepreselect')($scope.enquiryToDate)) {
							toaster
									.pop({
										type : 'error',
										body : 'Required to date is earlier than from date',
										showCloseButton : true,
										timeout : 4000
									});
						}
					}

					$scope.clear = function() {
						$scope.enquiryDate = undefined;
						$scope.requiredDate = undefined;
						$scope.functionHall = undefined;
						$scope.phoneNumber = undefined;
					}
					// //date time
					var that = this;

					$scope.dates = {
						date3 : new Date(),
					};
					$scope.dateOptions = {
						startingDay : 1,
						mindate : new Date(),
					};
					$scope.mindate = new Date();
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
					
					$scope.resetSearch = function(){
						$scope.enquiryToDate = '';
						$scope.enquiryDate = '';
						$scope.phoneNumber = '';
						$scope.functionHall = '';
					}

				})