
angular.module('filters', []).filter('time', function() {
  return function(input) {
	if(input==null)
	return "00:00";
	console.log("");
    return input.substring(0,2)+":"+input.substring(2,4);
  };
});