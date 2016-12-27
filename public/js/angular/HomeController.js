var App;
(function (App) {
    var HomeController = (function () {
        function HomeController() {
            console.log('Home Controller loaded...');
        }
        return HomeController;
    }());
    App.HomeController = HomeController;
})(App || (App = {}));
