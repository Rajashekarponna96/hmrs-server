angular.module('srmt')
.directive('gerDate', function($filter){

  return {

    restrict: 'A',

    require: 'ngModel',

    link:function(scope, iElem, iAttrs, ngModel) {

        var dateFilter = $filter('date');

        ngModel.$formatters.push(function(val) {

         return dateFilter(val, 'dd-MM-yyyy'); 

        });

        ngModel.$parsers.push(function(val) {

          var splitDate = val.split('.');

          var gerDateObj = new Date(splitDate[2], splitDate[1]-1, splitDate[0]);   

          return gerDateObj; 

        });

        iElem.datepicker({

              changeMonth: true,

              changeYear: true,

              dateFormat: 'dd-mm-yy',

              monthNames: ['Januar','Februar','März','April','Mai','Juni',

                           'Juli','August','September','Oktober','November','Dezember'],

              dayNames: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 

                         'Donnerstag', 'Freitag','Samstag'],

              dayNamesMin: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fre', 'Sa']

          });

    }

  };
});