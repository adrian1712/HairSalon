var App;
(function (App) {
    var ProductController = (function () {
        function ProductController(productService, $state, $stateParams) {
            console.log('- Product controller loaded.');
            console.log('- Product service: ', productService);
            this.productService = productService;
            this.stateService = $state;
            this.stateParamsService = $stateParams;
            console.log('passed params: ', this.stateParamsService);
            if (this.stateParamsService.id) {
                this.read(this.stateParamsService.id);
            }
            console.log('- current route: ', this.stateService.current);
            if (this.stateService.current.name == 'product-edit') {
                this.mode = 'edit';
            }
            else if (this.stateService.current.name == 'product-create') {
                this.mode = 'create';
            }
        }
        ProductController.prototype.create = function (id) {
            if (id) {
                console.log('- Updating the existing object.');
                this.update(id);
            }
            else {
                console.log('Creating a new object.');
                console.log('Product has been saved: ', this.product);
                this.productService.create(this.product);
            }
        };
        ProductController.prototype.read = function (id) {
            var _this = this;
            console.log('- Products have been read ', this.list);
            this.productService.read(id)
                .success(function (response) {
                if (id) {
                    _this.product = response;
                }
                else {
                    _this.list = response;
                }
            })
                .error(function (response) {
                console.error('Unable to read products: ', response);
            });
        };
        ProductController.prototype.update = function (id) {
            var _this = this;
            this.productService.update(id, this.product)
                .success(function (response) {
                _this.goToPage('product-view', { id: id });
            })
                .error(function (response) {
                console.error('Unable to update the product: ', response);
            });
        };
        ProductController.prototype.goToPage = function (route, data) {
            this.stateService.go(route, data);
        };
        return ProductController;
    }());
    ProductController.$inject = ['ProductService', '$state', '$stateParams',];
    App.ProductController = ProductController;
})(App || (App = {}));
