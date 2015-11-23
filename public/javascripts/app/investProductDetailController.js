(function() {
    angular
        .module('campusBankApp')
        .controller('investProductDetailController', investProductDetailController);

    investProductDetailController.$inject = ['$http'];

    function investProductDetailController($http) {
        var vm = this;

        vm.products = [
            {
                id: 3,
                school: '고려대학교',
                major: '컴퓨터학과',
                price: 3000,
                month: 36,
                interest: 7.5,
                remainingTime: '1일 2시간 30분',
                purpose: '목적없음',
                percentage: 54
            }, {
                id: 4,
                school: '연세대학교',
                major: '경제학과',
                price: 1000,
                month: 24,
                interest: 14.3,
                remainingTime: '5일 2시간 30분',
                purpose: '실험용',
                percentage: 48
            }
        ];
    }
})();