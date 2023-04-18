
angular.module('filters').filter('datepreselect', function() {
  return function(input) {
	  if(input==null){
		  return new Date();
	  }
	  else{
	  console.log("");
	  var datef = input.split('-');
		input = new Date(datef[2],
				parseInt(datef[1]) - 1, datef[0]);
		return input;
	  }
  };
});