// Define the `nodeInstanceManagerApp` module
const nodeInstanceManagerApp = angular
    .module('nodeInstanceManagerApp', ['ngRoute'])
    .config(($routeProvider, $locationProvider) => {
        $routeProvider
            .when('/', {
                templateUrl: './app/Views/Main/process-list.html'
            })
            .otherwise({
                redirectTo: '/'
            });

        $locationProvider.html5Mode(true);
    });