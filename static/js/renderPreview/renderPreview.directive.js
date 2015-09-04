angular.module('Falcon-email')
	.directive('renderPreview', function () {
		 return {
		 	scope: {
		 		html: '='
		 	},
		 	templateUrl: '/static/js/renderPreview/renderPreview.directive.html',
		 	link: function (scope, element) {

		 		var $frame = element.find('iframe')[0];

		 		scope.$watch('html', function( val ) {
		 			if(val) {
		 				$frame.contentDocument.write(val);
		 			}
		 		});
		 	}
		 }		
	});