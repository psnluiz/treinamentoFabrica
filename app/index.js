//Angular module with routes
var app = angular.module("authApp", ["ui.router", "firebase"])
    .value('fbURL', 'https://projetoangularjs.firebaseio.com/')
    .config(function($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise('/');

        $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'index.html'
        })
        .state('signup', {
            url: '/signup',
            templateUrl: 'signup.html'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'login.html'
        })
    })
    .controller('authCtrl', function($scope){
        
        $scope.signUpUser = function(){
            alert($scope.email);
            firebase.auth().createUserWithEmailAndPassword($scope.email, $scope.password).catch(function(error){
            });
            
        }
        
        $scope.login = function(){
            alert($scope.email);
            firebase.auth().signInWithEmailAndPassword($scope.email, $scope.password).catch(function (error){   
            });
        }
});
