'use strict';

var app = angular.module('myApp');

app.controller('mainCtrl', function($scope, $state, $auth, User) {
  $scope.isAuthenticated = () => $auth.isAuthenticated();

  $scope.logout = () => {
    User.logout()
      .then(() => {
        $state.go('home');
      })
  };

  $scope.authenticate = provider => {
    User.authenticate(provider)
      .then(res => {
        $state.go('home');
      })
      .catch(err => {
        console.log('err:', err);
      })
  };
});

app.controller('loginCtrl', function($scope, $state, User) {
  $scope.login = () => {
    User.login($scope.user)
      .then(res => {
        console.log('res:', res);
        $state.go('profile');
      })
      .catch(err => {
        console.log('err:', err);
      });
  };
});

app.controller('registerCtrl', function($scope, $state, User) {
  $scope.register = () => {
    if($scope.user.password !== $scope.user.password2) {
      $scope.user.password = null;
      $scope.user.password2 = null;
      alert('Passwords must match.  Try again.');
    } else {
      User.signup($scope.user)
        .then(res => {
          console.log('res:', res);
          $state.go('login');
        })
        .catch(err => {
          console.log('err:', err);
        });
    }
  };
});

app.controller('profileCtrl', function($scope, Profile) {
  $scope.user = Profile;
});

app.controller('usersCtrl', function($scope, User, Users) {
  $scope.users = Users;

  $scope.sendMessage = user => {
    User.sendMessage(user);
  };

  $scope.$on('message', function(ev, data) {
    console.log('data:', data);
  });
});
app.controller('searchMapsCtrl', function($scope, uiGmapGoogleMapApi,Location,$rootScope){
  console.log('searchMapsCtrl!');

  var longitude;
  var latitude;
  $scope.searchLocation = (data) => {
    // console.log("line 85", data);
    Location.getData(data)
    .then(res => {
      // console.log(res.data.latitude);
      // console.log(res.data.longitude);
      longitude = res.data.longitude.replace(/°/gi, '.').replace(/′/gi, '.')
      latitude = res.data.latitude.replace(/°/gi, '.').replace(/′/gi, '.')
      // console.log('test', longitude.slice(2,2));
      // longitude = parseInt((longitude.slice(0,2))) + parseInt(((longitude.slice(3,5))/60).toFixed(2)) + parseInt(((longitude.slice(5,7))/60).toFixed(2))
     var long1 = parseInt(longitude.slice(0,2))
     var long2 =parseInt(longitude.slice(3,5)) / 60;
     var long3 =parseInt(longitude.slice(6,8)) /3600;

     longitude = (long1 + long2 + long3).toFixed(2).toString() + longitude.slice(8,10)


     var lat1 = parseInt(latitude.slice(0,2))
     var lat2 =parseInt(latitude.slice(3,5)) / 60;
     var lat3 =parseInt(latitude.slice(6,8)) /3600;

     latitude = (lat1 + lat2 + lat3).toFixed(2).toString() + latitude.slice(8,10)

    //  console.log('long4', long4);
    //  console.log('lat4', lat4);


      // console.log('line 47', latitude);



      // console.log('lat', latitude);
      // console.log('long', longitude);
      if(latitude[latitude.length -1] === "S"){
        latitude =  "-" + latitude.slice(0,5)
      }
      else{
        latitude = latitude.slice(0,5)
      }
      if(longitude[longitude.length -1] === "W"){
        longitude = "-" + longitude.slice(0,5)
      }
      else{
        longitude = longitude.slice(0,5)
      }
      // console.log('longitude', typeof longitude)
      // var str = '37°32′54″N'.replace(/°/gi, '.')

      console.log('latitude', latitude)
      // $rootScope.latitude = latitude
      // $rootScope.longitude = longitude

      console.log('longitude', longitude)

    })



  }///////	geo:32.775833,-96.796667
  // console.log('rootScope', $scope.latitude);
  $scope.map = { center: { latitude: 32.78, longitude: -96.80}, zoom: 8 };


  uiGmapGoogleMapApi.then(function(maps) {

      });


})
