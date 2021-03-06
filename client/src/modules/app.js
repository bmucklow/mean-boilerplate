'use strict';

angular.module('meanBoilerplate', [
    'tpl-modules',
    'ui.router',
    'mbp.header',
    'mbp.home',
    'mbp.about',
    'mbp.user'
])

    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');
    }])

    .run(function ($rootScope, $log, AuthService) {

        $rootScope.user = AuthService.getCurrentUser();

        $rootScope.$on('user:unauthorized', function () {
            $log.info('User unauthorized');
        });
        $rootScope.$on('user:login', function () {
            $log.info('User logged in');
            $rootScope.user = AuthService.getCurrentUser();
        });
        $rootScope.$on('user:logout', function () {
            $log.info('User logged out');
            $rootScope.user = null;
        });
        $rootScope.$on('user:update', function () {
            $log.info('User profile updated');
            $rootScope.user = AuthService.getCurrentUser();
        });
    })

    .controller('AppCtrl', ['$scope', function ($scope, $log) {
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            $log.info('$stateChangeSuccess', toState);
            if (angular.isDefined(toState.data.pageTitle)) {
                $scope.pageTitle = toState.data.pageTitle + ' | meanBoilerplate';
            }
        });
    }])

;

/**
 * This module is a placeholder for production builds. During the build process
 * the html templates get cached into a $templateCache and are included in the
 * module declared below. We keep the empty declaration here so that we can always
 * declare the dependency above - even in a development build when we aren't using
 * the $templateCache.
 */
angular.module('tpl-modules', []);