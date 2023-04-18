angular.module('srmt')
// you will need to declare your module with the dependencies
// ['mwl.calendar', 'ui.bootstrap', 'ngAnimate']
.controller(
		'dashboard_functionHallController',
		function($filter, moment, $scope, $state, dashboard_functionHallService,
				$localStorage, calendarConfig, bookingInfoService) {
			var vm = this;

			$scope.init = function() {
				vm.timespanClicked(new Date());
				$scope.current_month = "01-"
						+ $filter('date')(new Date(), 'MM-yyyy');
				$scope.getEventsCustomMonth($scope.current_month);
				
			}

			$scope.getEventsCustomDate = function(date) {

				dashboard_functionHallService.getEventsByDate(date).then(
						function(response) {
							$scope.dayEvents = response.data;

						});
			};

			$scope.getEventsCustomMonth = function(date) {

				dashboard_functionHallService.getEventsMonthly(date).then(
						function(response) {
//							vm.timespanClicked($filter("datepreselect")(date));
							$scope.eventList = response.data;
							$scope.pushEvents($scope.eventList);
						});
			};

			var i = 0;
			$scope.$watchGroup([ '$scope.eventList' ],
					function(newVal, oldVal) {
						/* vm.timespanClicked($filter('date')(vm.lastDateClicked,'dd-MM-yyyy')); */
					});
			// These variables MUST be set as a minimum for the calendar
			// to work
			vm.calendarView = 'month';
			vm.viewDate = new Date();

			$scope.pushEvents = function(events) {
				vm.events = [];
				console.log($scope.events);
				angular.forEach(events, function(item) {
					// console.log(item.purpose);
					var status = '';
					var color = '';
					if (item.bookingStatus == 'confirm') {
						status = "info";
						color = "blue";
					} else if (item.bookingStatus == 'pending') {
						status = "warning";
						color = "orange";
					} else {
						status = "danger";
						color = "red";
					}
					newEvent = {
						title : '<font color="black">' + item.purpose
								+ ' at <strong>' + item.functionHall.code
								+ '</strong></font><font color=' + color
								+ '> &nbsp;' + item.bookingStatus + '</font>',
						type : status,
						startsAt : $filter('datetimepreselect')(
								item.requiredFromDate),
					// endsAt :
					// $filter('datepreselect')(item.requiredToDate),
					// functionHall : item.functionHall.code,
					// customerName : item.customer.fullName,
					// customerMobile : item.customer.mobile,
					// bookingStatus : item.bookingStatus
					}
					vm.events.push(newEvent);
				});
				// console.log(vm.events);

			};

			vm.events = [];

			vm.isCellOpen = true;
			vm.eventClicked = function(event) {
				console.log('Clicked', event);
			};

			vm.eventEdited = function(event) {
				console.log('Edited', event);
			};

			vm.eventDeleted = function(event) {
				console.log('Deleted', event);
			};

			vm.eventTimesChanged = function(event) {
				console.log('Dropped or resized', event);
			};

			vm.toggle = function($event, field, event) {
				$event.preventDefault();
				$event.stopPropagation();
				event[field] = !event[field];
			};

			vm.timespanClicked = function(date) {
				date = $filter('date')(date, 'dd-MM-yyyy');
				vm.lastDateClicked = date;
				$scope.getEventsCustomDate(date);
			};

			var nextDate = "";
			$scope.getPreviousMonth = function() {
				var datef = $scope.current_month.split('-');
				$scope.current_month = datef[0] + "-"
						+ (parseInt(datef[1]) - 1) + "-" + datef[2];
				nextDate = $filter('datepreselect')($scope.current_month);
				$scope.current_month = "01-"
						+ $filter("date")(nextDate, "MM-yyyy");

				$scope.getEventsCustomMonth($scope.current_month);
				vm.timespanClicked($filter("datepreselect")($scope.current_month));
			};

			$scope.getNextMonth = function() {
				var datef = $scope.current_month.split('-');
				$scope.current_month = datef[0] + "-"
						+ (parseInt(datef[1]) + 1) + "-" + datef[2];
				nextDate = $filter('datepreselect')($scope.current_month);
				$scope.current_month = "01-"
						+ $filter("date")(nextDate, "MM-yyyy");
				$scope.getEventsCustomMonth($scope.current_month);
				vm.timespanClicked($filter("datepreselect")($scope.current_month));
			};

			$scope.getCurrentMonth = function() {
				$scope.current_month = $filter("date")
						(new Date(), "dd-MM-yyyy");
				$scope.getEventsCustomMonth($scope.current_month);
			}

			vm.viewChangeClicked = function(nextView) {// disabling the click
														// on day label to
														// prevent day view
				if (nextView === 'day') {
					return false;
				}
			};// disabling the click on day label to prevent day view

			
			  /*calendarConfig.templates.calendarMonthCell =
			  'groupedMonthEvents.html';
			  
			  $scope.$on('$destroy', function() {
			  calendarConfig.templates.calendarMonthCell =
			  'mwl/calendarMonthCell.html'; });*/
			 
			vm.groupEvents = function(cell) {
				cell.groups = {};
				cell.events.forEach(function(event) {
					cell.groups[event.type] = cell.groups[event.type] || [];
					cell.groups[event.type].push(event);
				});
			};
			vm.isCellOpen = true;
			/*
			 * vm.modifyCell = function(cell){ cell.label = cell.label+""; }
			 */
			
			$scope.gotoAddPayment = function(enquiryId){
				bookingInfoService.getBookingObjectByEnquiryId(enquiryId).then(function(response){
					$scope.booking = response.data;
					$state.go("home.crm.addPayment",{
						bookHall: $scope.booking
					});
				})
			};
			
			$scope.gotoUpdateBooking = function(enquiryId){
				bookingInfoService.getBookingObjectByEnquiryId(enquiryId).then(function(response){
					$scope.booking = response.data;
					$state.go("home.crm.updateBookingInfo",{
						bookHall : $scope.booking
					})
				})
			}

		});
angular.module('srmt').factory('alert', function($uibModal) {

	function show(action, event) {
		return $uibModal.open({
			templateUrl : 'modalContent.html',
			controller : function() {
				var vm = this;
				vm.action = action;
				vm.event = event;
			},
			controllerAs : 'vm'
		});
	}

	return {
		show : show
	};

});