namespace App {
    let app = angular.module ('App', ['ui.router']);
    app.config ([
        '$stateProvider',
        ($stateProvider: angular.ui.IStateProvider) => {
            $stateProvider
                .state ('home', {
                    url: '/',
                    templateUrl: '/templates/partials/home.html',
                    controller: App.HomeController,
                    controllerAs: 'homeController'
                })
                .state ('products', {
                    url: '/products',
                    templateUrl: '/templates/partials/products.html',
                    controller: App.ProductsController,
                    controllerAs: 'productsController'
                })
        }
    ])
}
