var App;
(function (App) {
    var app = angular.module('App', ['ui.router']);
    app.config([
        '$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state('home', {
                url: '/',
                templateUrl: '/templates/partials/home.html',
                controller: App.HomeController,
                controllerAs: 'homeController'
            });
        }
    ]);
})(App || (App = {}));
