// OLD ES5 Directive Module
angular.module('chatapp.directives', [])

	.directive('sidebarDirective', function() {
	    return {
					templateUrl: 'partials/sidebar.html'
	    };
	})

	.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});
