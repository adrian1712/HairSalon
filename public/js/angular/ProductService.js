var App;
(function (App) {
    var app = angular.module('App');
    var ProductService = (function () {
        function ProductService($httpService) {
            this.httpService = $httpService;
        }
        ProductService.prototype.create = function (product) {
            var promise = this.httpService({
                url: '/product',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: product
            });
            return promise;
        };
        ProductService.prototype.read = function (id) {
            var url = '/product';
            if (id) {
                url = url + '/' + id;
            }
            var promise = this.httpService({
                url: url,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {}
            });
            return promise;
        };
        ProductService.prototype.update = function (id, product) {
            console.log('id: ', id);
            var url = '/product/admin/' + id;
            console.log('url: ', url);
            var promise = this.httpService({
                url: url,
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: product
            });
            return promise;
        };
        return ProductService;
    }());
    ProductService.$inject = ['$http'];
    App.ProductService = ProductService;
    app.service('ProductService', ProductService);
})(App || (App = {}));
