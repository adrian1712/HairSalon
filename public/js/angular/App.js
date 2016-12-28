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
            })
                .state('products', {
                url: '/products',
                templateUrl: '/templates/partials/products.html',
                controller: App.ProductsController,
                controllerAs: 'productsController'
            });
        }
    ]);
})(App || (App = {}));
