angular.module('srmt').directive('allowOnlyNumbers', allowOnlyNumbers);
function allowOnlyNumbers() {
	return {
		require : 'ngModel',
		link : function(scope, element, attr, ngModelCtrl) {
			function fromUser(text) {
				
				var transformedInput = text.replace( /[a-zA-Z@#$!=.,?%&*()+_~/^;:`\\<>{}\-\|\"\'\[\]]/g, '');
				// console.log(transformedInput);
				if (transformedInput !== text) {
					ngModelCtrl.$setViewValue(transformedInput);
					ngModelCtrl.$render();
				}
				return transformedInput;
			}
			ngModelCtrl.$parsers.push(fromUser);
		}
	};
};

/**
 * <input type="text" ng-model="name" allow-only-numbers>
 */