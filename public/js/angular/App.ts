namespace App {
    let app = angular.module ('App', ['ui-router']);
    app.config ([
        '$stateProvider',
        ($stateProvider: angular.ui.IStateProvider) => {
            $stateProvider
                .state ('home', {
                    url: '/',
                    template: 'this is home'
                })
        }
    ])
}