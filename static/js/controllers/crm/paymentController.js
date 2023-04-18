angular.module('srmt').controller(
		"paymentController",
		function($scope, $state, paymentService, hallRoomService, $filter,
				notify, $stateParams, $localStorage, $uibModal,
				reportService) {

			$scope.certificate = $stateParams.bill;
			

			$scope.gotoAddpayment = function() {
				$state.go('home.addPayment');
			};

			$scope.gotopaymentList = function() {
				$state.go("home.paymentList");
			};
			$scope.paymentDetail = $stateParams.payment;
			console.log($scope.paymentDetail);
			$scope.gotoViewPayment = function(payment) {
				payment.paymentDate = $filter("date")(payment.paymentDate,
						"dd-MM-yyyy");
				$state.go("home.crm.viewPayment", {
					payment : payment
				});

			};

			/*
			 * * pagination logic
			 * 
			 * need to count total page in count menthos need to call count() in
			 * data list method.
			 * 
			 * need to call data list methis in $scope.$watchGroup([ 'page',
			 * 'size' ]
			 * 
			 * need to take care about sno neeed to check recods for page need
			 * to check totla records
			 *//*
			 */

			$scope.page = 0;
			$scope.size = 10;
			$scope.getCount = function(url) {
				paymentService.getCount(url).then(function(response) {
					$scope.count = response.data;
					$scope.totalPages = Math.ceil($scope.count / $scope.size);
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
				$scope.searchPayment();
			});

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
			$scope.open3 = function() {
				$scope.popup3.opened = true;
			};
			$scope.popup1 = {
				opened : false
			};
			$scope.popup2 = {
				opened : false
			};
			$scope.popup3 = {
				opened : false
			};
			$scope.getPayments = function() {
				paymentService.getPayments($scope.page, $scope.size).then(
						function(response) {
							$scope.paymentList = response.data;
							// $scope.getCount();
						})
			}

			$scope.generatePayment = function(id) {
				reportService.generatePaymentReceipt(id).then(
						function(response) {
							var file = new Blob([ response.data ], {
								type : 'application/pdf'
							});
							var fileURL = URL.createObjectURL(file);
							window.open(fileURL);
						})
			};

			$scope.searchPayment = function() {
				var url = "?"
				if ($scope.paymentDate != undefined) {
					$scope.paymentDate = $filter('date')($scope.paymentDate,
							'dd-MM-yyyy');
					url = url + "date=" + $scope.paymentDate + "&";
				}
				if ($scope.paymentType != undefined) {

					url = url + "paymentType=" + $scope.paymentType + "&";
				}

				if ($scope.phoneNumber != undefined) {
					url = url + "mobile=" + $scope.phoneNumber + "&";
				}

				if ($scope.bookingId != undefined) {
					url = url + "bookingId=" + $scope.bookingId + "&";
				}

				var countUrl = url;
				countUrl = countUrl.substr(0, countUrl.length - 1);
				dataurl = url + "page=" + $scope.page + "&size=" + $scope.size;
				paymentService.searchPayment(dataurl).then(function(response) {
					$scope.paymentList = response.data;
					$scope.getCount(countUrl);
					$scope.clear();
				})
			}
			$scope.clear = function() {
				$scope.paymentDate = undefined;
				$scope.paymentType = undefined;
				$scope.phoneNumber = undefined;
				$scope.bookingId = undefined;
			}

			$scope.searchByRecieptIdAndDate = function() {

				var url2 = "?"
				if ($scope.paymentDate != undefined) {
					$scope.paymentDate = $filter('date')($scope.paymentDate,
							'dd-MM-yyyy');
					url2 = url2 + "date=" + $scope.paymentDate + "&";
				}
				if ($scope.recieptNumber != undefined) {
					url2 = url2 + "recieptId=" + $scope.recieptNumber + "&";
				}

				// dataUrl = dataUrl.substr(0, countUrl.length - 1);
				var countUrl2 = url2;
				countUrl2 = countUrl2.substr(0, countUrl2.length - 1);
				var dataUrls = url2 + "page=" + $scope.page + "&size="
						+ $scope.size;
				paymentService.searchByRecieptIdAndDate(dataUrls).then(
						function(response) {
							$scope.certificateList = response.data;
							$scope.getMatchedCertificatesCount(countUrl2);
						})
				$scope.paymentDate = null;
			};

			$scope.getMatchedCertificatesCount = function(countUrl) {

				paymentService.getMatchedCertificatesCount(countUrl).then(
						function(response) {
							$scope.countCertificates = response.data;
							$scope.totalPages = Math.ceil($scope.count
									/ $scope.size);
						});
			};

			$scope.gotoViewCertificate = function(bill) {
				$state.go("home.crm.viewMarriageCertificate", {
					bill : bill
				});
			};

			$scope.gotoPrintCertiificate = function(billId) {
				paymentService.printCertificate(billId).then(
						function(response) {
							var file = new Blob([ response.data ], {
								type : 'application/pdf'
							});
							var fileURL = URL.createObjectURL(file);
							window.open(fileURL);
						})
			};

			$scope.gotoCertificateList = function() {
				$state.go("home.crm.marriageCertificate");
			};
			$scope.generatemarriageCertificate = function(id) {
				reportService.marriageCerificatePrint(id).then(
						function(response) {
							var file = new Blob([ response.data ], {
								type : 'application/pdf'
							});
							var fileURL = URL.createObjectURL(file);
							window.open(fileURL);
						});
			};

		});