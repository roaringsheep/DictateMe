'use strict';

angular.module('dictateMeApp')
    .controller('NavbarCtrl', function($scope, $location) {
        $scope.menu = [{
            'title': 'How To Use',
            'link': '',
            'modalId': '#howTo'
        }, {
            'title': 'About',
            'link': '',
            'modalId': '#about'
        }, {
            'title': 'FAQ',
            'link': '/faq',
            'modalId': ''
        }];

        $scope.isCollapsed = true;

        $scope.isActive = function(route) {
            return route === $location.path();
        };
    });
