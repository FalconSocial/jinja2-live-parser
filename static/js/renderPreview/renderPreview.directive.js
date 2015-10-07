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
		 			//Hack to override previews document data.
		 			//Should be refactored.
		 			
		 			$frame.contentWindow.document.open();
		 			$frame.contentWindow.document.write('');
		 			$frame.contentWindow.document.close();

		 			if(val) {
		 				$frame.contentDocument.write(val);
		 			}
		 		});
		 	}
		 }		
	});