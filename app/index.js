//Angular module with routes
var app = angular.module("authApp", ["ui.router", "firebase"]);

app
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
    });

app.factory('stateService', function(){
    var state = false;

    var getState = function(){
        return state;
    }

    var changeState = function(){
        if(state){
            state = false;
        }
        else{
            state = true;
        }
    }
});

app.controller('signUpCtrl', function($scope, state){

    $scope.data = {
        name : "",
        email: "",
        password: ""
    };

    $scope.resetForm = function(){
        $scope.data = {};
    }
   
    $scope.signUp = function(){
        alert($scope.email);
        firebase.auth().createUserWithEmailAndPassword($scope.email, $scope.password)
        .then(function(user){

            alert("Usuario criado com ID: " + user.uid);


            $scope.resetForm();
        }).catch(function(error){
            console.log("Error ao logar: " + error)
        });
    }
});

app.controller('loginCtrl', function($scope, stateService){
    
    
    console.log(stateService.getState());
    
    $scope.login = function(){

    firebase.auth().signInWithEmailAndPassword($scope.email, $scope.password)
        .then(function(user) {

            alert(user.uid);   

            $scope.state = true;

        }).catch(function (error){ 
            console.log("Erro de Login: ", error);
            $scope.state = false;
        });
    }
});

app.controller("isLoggedCtrl", function($scope, stateService){

    


    // $scope.isSignedIn = function(){
    //     user = firebase.auth().currentUser;
    //     if(user){
    //         $scope.data.state = true;
    //     }
    //     else{
    //         $scope.data.state = false;
    //     }
    // }


});