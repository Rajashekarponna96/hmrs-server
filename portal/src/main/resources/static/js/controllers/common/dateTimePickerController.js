angular.module('srmt').controller(
		"dateTimePickerController",function($scope){
			var that = this;
		    
		    $scope.dates = {
		        date3: new Date(),
		    };

		    $scope.open = {
		        date1: false,
		        date2: false,
		        date3: false
		    };

		    // Disable today selection
		    $scope.disabled = function(date, mode) {
		        return (mode === 'day' && (new Date().toDateString() == date.toDateString()));
		    };
		    $scope.dateOptions = {
		        showWeeks: false,
		        startingDay: 1
		    };

		    $scope.timeOptions = {
		        readonlyInput: false,
		        showMeridian: false
		    };

		    $scope.dateModeOptions = {
		        minMode: 'year',
		        maxMode: 'year'
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
		});