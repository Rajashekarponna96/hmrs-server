angular.module("srmt").controller(
		'invoiceControler',
		function($state, $scope, toaster, invoiceService,bookingInfoService,$stateParams) {
			$scope.gotoInvoiceList = function() {
				$state.go('home.crm.invoicelist');
			}
			$scope.gotoaddInvoice = function() {
				$state.go('home.crm.addInvoice');
			}
			
			$scope.invoiceDetail=$stateParams.invoice;
			console.log($scope.invoiceDetail);
			$scope.gotoupdateInvoice = function(invoice) {
				$state.go('home.crm.updateInvoice',{
					invoice:invoice
				});
			}
			$scope.gotoviewInvoice = function(invoice) {
				$state.go('home.crm.viewInvoice',{
					invoice:invoice
				});
			}
			
			$scope.getBookingsWithOutInvoice=function(){
				bookingInfoService.getBookingsWithOutInvoice().then(function(response){
					$scope.bookingsWithOutInvoice=response.data;
					if($scope.bookingsWithOutInvoice.length<=0){
						toaster.pop({
							type : 'error',
							body : 'At Present There is No Bookings To add Bill',
							showCloseButton : true,
							timeout : 4000
						});
					}
//					$scope.bookingsWithOutInvoice=response.data;
					
				},function(error) {
					toaster.pop({
						type : 'error',
						body : 'At Present There is No Bookings To add Bill',
						showCloseButton : true,
						timeout : 4000
					});
				})
				
			}
			
			
			
			$scope.getEntireBookings=function(){
				bookingInfoService.getEntireBookings().then(function(response){
					$scope.bookingsList=response.data;
				})
			}
			
			$scope.getActiveRateCard=function(id){
				bookingInfoService.getActiveRateCard(id).then(function(response){
					$scope.activeRateCard=response.data;
				})
			}
			
		
			$scope.getInvoices = function() {
				invoiceService.getInvoices($scope.page, $scope.size).then(
						function(response) {
							$scope.invoicesList = response.data;

						})
			}
		
			 
         
			
			$scope.addInvoice = function(invoice) {
				
				
				$scope.hallBill={
						name:'Hall Rent',
						unitPrice:$scope.activeRateCard.hallRentPerDay,
				         quantity:1,
				         
				}
				$scope.CleaningCharges={
						name:'Cleaning Charges',
						unitPrice:$scope.activeRateCard.cleaningCharges,
				         quantity:1,
				         
				}
				$scope.roomBill={
						name:'Room Rent',
						unitPrice:$scope.activeRateCard.roomRentPerDay,
				         quantity:$scope.invoice.booking.additionalRooms,
				         
				}
				$scope.electricityBill={
						name:'Electricity Charge',
						unitPrice:$scope.activeRateCard.electricityChargePerUnit,
				         quantity:$scope.electricityQuantity,
				         
				}
				$scope.generatorBill={
						name:'Generator Rent',
						unitPrice:$scope.activeRateCard.generatorRentPerHour,
				         quantity:$scope.generatorQuantity,
				         
				}
				$scope.particulars=[$scope.hallBill,$scope.roomBill,$scope.electricityBill,$scope.generatorBill,$scope.CleaningCharges];
				invoice.particulars=$scope.particulars;
				invoice.customer=$scope.invoice.booking.functionHallEnquiry.customer;
				invoice.rateCard=$scope.activeRateCard;
				invoice.tax=$scope.activeRateCard.serviceTax;
				invoice.booking=$scope.invoice.booking;
				invoiceService.addInvoice(invoice).then(function(response) {
					toaster.success({

						body : 'Added Successfully',
						showCloseButton : true,
						timeout : 4000
					});
					$scope.gotoInvoiceList();
				}, function(error) {
					toaster.pop({
						type : 'error',
						body : error.data.message,
						showCloseButton : true,
						timeout : 4000
					});
				})

			}
			$scope.UpdateInvoice = function() {
				invoiceService.UpdateInvoice().then(function(response) {
					toaster.success({

						body : 'Added Successfully',
						showCloseButton : true,
						timeout : 4000
					});
				}, function(error) {
					toaster.pop({
						type : 'error',
						body : error.data.message,
						showCloseButton : true,
						timeout : 4000
					});
				})
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
				invoiceService.getCount().then(
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
				$scope.getInvoices();
				$scope.getCount();
			});

			/**
			 * pagination logic
			 */
			
			
			$scope.generateInvoice=function(id){
				invoiceService.generateInvoice(id).then(function(response){
					var file = new Blob([ response.data ], {
						type : 'application/pdf'
					});
					var fileURL = URL.createObjectURL(file);
					window.open(fileURL);
				})
			}
		})