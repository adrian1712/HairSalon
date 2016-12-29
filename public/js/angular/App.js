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
                .state('product', {
                url: '/product',
                templateUrl: '/templates/partials/product/list.html',
                controller: App.ProductController,
                controllerAs: 'productController'
            })
                .state('product-create', {
                url: '/product/create',
                templateUrl: '/templates/partials/product/edit.html',
                controller: App.ProductController,
                controllerAs: 'productController',
            })
                .state('product-view', {
                url: '/product/:id',
                templateUrl: '/templates/partials/product/view.html',
                controller: App.ProductController,
                controllerAs: 'productController'
            })
                .state('product-edit', {
                url: '/product/:id',
                templateUrl: '/templates/partials/product/edit.html',
                controller: App.ProductController,
                controllerAs: 'productController'
            });
        }
    ]);
})(App || (App = {}));
