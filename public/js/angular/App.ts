namespace App {
    let app = angular.module ('App', ['ui.router']);
    app.config ([
        '$stateProvider',
        ($stateProvider) => {
            $stateProvider
                .state ('home', {
                    url: '/',
                    templateUrl: '/templates/partials/home.html',
                    controller: App.HomeController,
                    controllerAs: 'homeController'
                })
                .state ('product', {
                    url: '/product',
                    templateUrl: '/templates/partials/product/list.html',
                    controller: App.ProductController,
                    controllerAs: 'productController'
                })
                // NOTE: add a create route
                .state ('product-create', {
                    url: '/product/create',
                    // template: 'here we are at create'
                    templateUrl: '/templates/partials/product/edit.html',
                    controller: App.ProductController,
                    controllerAs: 'productController',
                })
                .state ('product-view', {
                    url: '/product/:id',
                    templateUrl: '/templates/partials/product/view.html',
                    controller: App.ProductController,
                    controllerAs: 'productController'
                })
                .state ('product-edit', {
                    url: '/product/:id',
                    templateUrl: '/templates/partials/product/edit.html',
                    controller: App.ProductController,
                    controllerAs: 'productController'
                })
        }
    ])
}
