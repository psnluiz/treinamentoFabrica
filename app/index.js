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

app.controller("signUpCtrl")

app.controller('signUpCtrl', function($scope){
    $scope.writeToDb = function(){
        var user = firebase.auth().currentUser;
        firebase.database().ref('users/' + user.uid).set({
            nome: $scope.name,
            email: $scope.email,
            imageUrl: ""
        });
    }

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

app.controller('loginCtrl', function($scope){
    
    $scope.isLogged
    
    
    $scope.login = function(){

    firebase.auth().signInWithEmailAndPassword($scope.email, $scope.password)
        .then(function() {
            user = firebase.auth().currentUser;
            alert("Logado com ID: " + user.uid);    
            $scope.isLogged = true;
            $scope.$emit("loggedStateChange", $scope.isLogged);
        }).catch(function (error){ 
            console.log("Erro de Login: ", error);
            $scope.isLogged = false;
            $scope.$emit("loggedStateChange", $scope.isLogged);
        });
        
        console.log("loginCtrl, isLogged :" + $scope.isLogged);
    }
});

app.controller("isLoggedCtrl", function($scope){
    
    $scope.init = function(){
        $scope.isLogged = false;
    }

    $scope.init();

    $scope.$on("loggedStateChange", function(event, data){
        $scope.isLogged = data;
        $scope.$apply();
        console.log("isLoggedCtrl, isLogged: " + $scope.isLogged);
    });
    
    $scope.logoff = function(){
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
            $scope.isLogged = false;
            $scope.$apply();
            console.log("Sign Out Sucessful!");
          }).catch(function(error) {
            // An error happened.
            console.log("Sign out failed ", error);             
          });
          
    }


    // $s   cope.isSignedIn = function(){
    //     user = firebase.auth().currentUser;
    //     if(user){
    //         $scope.data.state = true;
    //     }
    //     else{
    //         $scope.data.state = false;
    //     }
    // }


});