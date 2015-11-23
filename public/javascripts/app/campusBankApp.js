(function() {
    var app
        = angular
            .module('campusBankApp', ['ngRoute']);

    app.config(['$routeProvider', routeConfig]);
    app.config(['$locationProvider', locationConfig]);

    function routeConfig($provider) {
        $provider
            .when('/invest', {
                templateUrl: '/templates/invest/introduce.html'
            }).when('/invest/products', {
                templateUrl: '/templates/invest/product-list.html',
                controller: 'investProductListController',
                controllerAs: 'productList'
            }).when('/invest/products/:productId', {
                templateUrl: '/templates/invest/product-detail.html',
                controller: 'investProductDetailController',
                controllerAs: 'productDetail'
            }).when('/invest/cart', {
                templateUrl: '/templates/invest/cart.html',
                controller: 'investCartController',
                controllerAs: 'cart'
            }).when('/invest/requests', {
                templateUrl: '/templates/invest/request-list.html',
                controller: 'investRequestListController',
                controllerAs: 'requestList'
            }).when('/invest/profits', {
                templateUrl: '/templates/invest/profits.html',
                controller: 'investProfitListController',
                controllerAs: 'profitList'
            });
    }

    function locationConfig($provider) {
        $provider
            .html5Mode(true)
            .hashPrefix('!');
    }
})();