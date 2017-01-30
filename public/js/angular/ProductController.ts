// //NOTE: cant remember why we need name space but that comes first After connecting to the App.ts
// namespace App {
//     // NOTE: 2 export the Controller
//     export class ProductController {
//
//         static $inject = ['ProductService', '$state', '$stateParams'];
//         // NOTE: decalre the variables
//         private productService;
//
//         private stateService;
//         private stateParamsService;
//
//         public product;
//
//         //NOTE 3 create a constructor
//         constructor (
//             // NOTE: 5 connect the productService
//             productService: App.ProductService,
//             $state: angular.ui.IStateProvider,
//             $stateParams: angular.ui.IStateParamsService,
//         ) {
//             console.log ('Products Controller loaded...');
//             // NOTE: 5b connect the services
//             this.productService = productService;
//             this.stateService = $state;
//             this.stateParamsService = $stateParams;
//         }
//         // NOTE: 4 create a public variable to create a product
//         public create (id) {
//             if (id) {
//                 console.log ('- Updating the existing object.');
//                 // this.update (id);
//             }
//             else {
//                 console.log ('Creating a new object.');
//                 console.log ('Product has been saved: ', this.product);
//                 this.productService.create (this.product);
//             }
//
//         }
//         public goToPage (route, data) {
//             this.stateService.go (route, data);
//         }
//     }
// }


namespace App {
    export class ProductController {
        static $inject = ['ProductService', '$state', '$stateParams',];

        private productService;

        private stateService;
        private stateParamsService;

        public product;
        public list;
        public mode;

        constructor (
            productService: App.ProductService,
            $state: angular.ui.IStateProvider,
            $stateParams: angular.ui.IStateParamsService,
        ) {
            console.log ('- Product controller loaded.');
            console.log ('- Product service: ', productService);

            this.productService = productService;
            this.stateService = $state;
            this.stateParamsService = $stateParams;
            console.log ('passed params: ', this.stateParamsService);

            if (this.stateParamsService.id) {
                this.read (this.stateParamsService.id);
            }
            console.log ('- current route: ', this.stateService.current);

            if (this.stateService.current.name == 'product-edit') {
                this.mode = 'edit';
            }
            else if (this.stateService.current.name == 'product-create') {
                this.mode = 'create';
            }
        }

        public create (id) {
            if (id) {
                console.log ('- Updating the existing object.');
                this.update (id);
            }
            else {
                console.log ('Creating a new object.');
                console.log ('Product has been saved: ', this.product);
                this.productService.create (this.product);
            }
        }

        public read (id) {
            console.log ('- Products have been read ', this.list);
            this.productService.read (id)
                .success ((response) => {
                    if (id) {
                        this.product = response;
                    }
                    else {
                        this.list = response;
                    }
                })
                .error ((response) => {
                    console.error ('Unable to read products: ', response);
                });
        }

        public update (id) {
            this.productService.update (id, this.product)
                .success ((response) => {
                    this.goToPage ('product-view', { id: id });
                })
                .error ((response) => {
                    console.error ('Unable to update the product: ', response);
                })
        }

        public goToPage (route, data) {
            this.stateService.go (route, data);
        }
    }
}
