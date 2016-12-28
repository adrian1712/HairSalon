var App;
(function (App) {
    var ProductsController = (function () {
        function ProductsController() {
            console.log('Products Controller loaded...');
        }
        return ProductsController;
    }());
    App.ProductsController = ProductsController;
})(App || (App = {}));
