var app = angular.module('DD-Hackathon', ['ui.router', 'ngCookies', 'ngTable', 'ui.bootstrap']);

app.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', function ($stateProvider, $locationProvider, $urlRouterProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('logs', {
            url: '/logs',
            templateUrl: '/views/templates/logs.html'
        })
        .state('table', {
            url: '/',
            templateUrl: '/views/templates/tableLog.html'
        })
}]);