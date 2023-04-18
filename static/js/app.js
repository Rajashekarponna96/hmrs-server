/**
 * INSPINIA - Responsive Admin Theme
 * 
 */
(function() {
	angular.module('srmt', [ 'ui.router', // Routing
	'oc.lazyLoad', // ocLazyLoad
	'ui.bootstrap', // Ui Bootstrap
	'pascalprecht.translate', // Angular Translate
	'ngIdle', // Idle timer
	'ngSanitize', 'mwl.calendar', 'ngStorage' ,'cgNotify','toaster','ngAnimate','oitozero.ngSweetAlert','datePicker','filters','ui.multiselect','ui.tree'])
})();

// Other libraries are loaded dynamically in the config.js file using the
// library ocLazyLoad
