// namespace App {
//     let app = angular.module ('App');
//
//     export class ProductService {
//         static $inject = ['$http'];
//
//         private httpService;
//         constructor ($httpService: angular.IHttpService) {
//
//             this.httpService = $httpService;
//         }
//
//         // NOTE: POST /product
//         public create (product) {
//             let promise = this.httpService ({
//                 url: '/product',
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 data: product
//             });
//
//             return promise;
//         }
//     }
//
//     // Register the class as a angular service.
//     app.service ('ProductService', ProductService);
// }


namespace App {
    // Grab the app module.
    let app = angular.module ('App');

    export class ProductService {
        static $inject = ['$http'];

        private httpService;

        // Pull in the dependency services.
        constructor ($httpService: angular.IHttpService) {

            // Point the internal httpService to the
            // $httpService passed to us by angular.
            this.httpService = $httpService;
        }

        public create (product) {
            let promise = this.httpService ({
                url: '/product',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: product
            });

            return promise;
        }

        public read (id) {
            let url = '/product';

            // If a valid id was passed in, modify the url.
            if (id) {
                url = url + '/' + id;
            }

            let promise = this.httpService ({
                url: url,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {}
            });

            return promise;
        }

        public update (id, product) {
            console.log ('id: ', id);
            let url = '/product/admin/' + id;
            console.log ('url: ', url);

            let promise = this.httpService ({
                url: url,
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: product
            });

            return promise;
        }
    }

    // Register the class as a angular service.
    app.service ('ProductService', ProductService);
}
