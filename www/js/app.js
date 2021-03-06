/**
 *  ESSR Ionic App
 *
 *  see version.js for current version
 *
 *  uses versions:
 *  ionic:        1.7.16
 *  firebase:     3.6.5
 *  angularfire:  2.3.0
 *
 * To edit the SASS, use gulp:
 * npm install -g gulp
 *
 * Also install the following ngCordova plugins:
 *  cordova plugin add cordova-plugin-inappbrowser
 *  cordova plugin add ionic-plugin-keyboard
 *
 *
 */

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

/* global angular PRIVATE firebase cordova ionic alert StatusBar */

var config = {
    apiKey: "AIzaSyDV-2PsvBDQI_0bwTjT9yowIhE1gv05CO8",
    authDomain: "esrr-aoc.firebaseapp.com",
    databaseURL: "https://esrr-aoc.firebaseio.com",
    projectId: "esrr-aoc",
    storageBucket: "esrr-aoc.appspot.com",
    messagingSenderId: "975907153175"
};
firebase.initializeApp(config);



angular.module('app', [
		'ionic',
	        'ngCordova',
	        'ngSanitize',
		'app.controllers', 
		'app.routes', 
		'app.directives',
		'app.services',
                'LocalStorageModule',
		'firebase'])

    .config(function($ionicConfigProvider, $sceDelegateProvider){

    $sceDelegateProvider.resourceUrlWhitelist([ 'self','*://www.youtube.com/**', '*://player.vimeo.com/video/**']);

})

    .config(function($firebaseRefProvider){
         $firebaseRefProvider.registerUrl({
            
            default: config.databaseURL,
            object:`${config.databaseURL}/events/`
         });
     }) 


    .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }

	/***
	if (window.device != null) {
      console.log('device UUID=' + window.device.uuid)
      $rootScope.deviceUUID = window.device.uuid
       // alert("device UUID="+window.device.uuid);
    } else {
      $rootScope.deviceUUID = 'fakedout-web-no-uuid'
    }
    ***/
    });
})

/*
  This directive is used to disable the "drag to open" functionality of the Side-Menu
  when you are dragging a Slider component.
*/
    .directive('disableSideMenuDrag', ['$ionicSideMenuDelegate', '$rootScope', function($ionicSideMenuDelegate, $rootScope) {
        return {
            restrict: "A",  
            controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {

                function stopDrag(){
                    $ionicSideMenuDelegate.canDragContent(false);
                }

                function allowDrag(){
                    $ionicSideMenuDelegate.canDragContent(true);
                }

                $rootScope.$on('$ionicSlides.slideChangeEnd', allowDrag);
                $element.on('touchstart', stopDrag);
                $element.on('touchend', allowDrag);
                $element.on('mousedown', stopDrag);
                $element.on('mouseup', allowDrag);

            }]
        };
    }])

/*
  This directive is used to open regular and dynamic href links inside of inappbrowser.
*/
    .directive('hrefInappbrowser', function() {
    return {
        restrict: 'A',
        replace: false,
        transclude: false,
        link: function(scope, element, attrs) {
            var href = attrs['hrefInappbrowser'];

            attrs.$observe('hrefInappbrowser', function(val){
                href = val;
            });

            element.bind('click', function (event) {

                window.open(href, '_system', 'location=yes');

                event.preventDefault();
                event.stopPropagation();

            });
        }
    };
});
