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
app.controller('searchMapsCtrl', function($scope, uiGmapGoogleMapApi,Location,$rootScope,$state){
  console.log('searchMapsCtrl!');

  var longitude;
  var latitude;

  $scope.showMaps = false;

  $scope.searchLocation = (data) => {
    // console.log("line 85", data);
    Location.getData(data)
    .then(res => {
      // console.log(res.data.latitude);
      // console.log(res.data.longitude);
      longitude = res.data.longitude.replace(/°/gi, '.').replace(/′/gi, '.')
      latitude = res.data.latitude.replace(/°/gi, '.').replace(/′/gi, '.')
      console.log(longitude.replace(/″/gi, '.'));
      console.log(latitude.replace(/″/gi, '.'));
      // console.log('test', longitude.slice(2,2));
      // longitude = parseInt((longitude.slice(0,2))) + parseInt(((longitude.slice(3,5))/60).toFixed(2)) + parseInt(((longitude.slice(5,7))/60).toFixed(2))

      console.log("WOJOOJOJOJOJO", longitude.length);
      console.log('longitude', longitude);
      console.log("latitude", latitude);
      // if(longitude.length ===)
      if(longitude.length == 10){
        var long1 = parseInt(longitude.slice(0,2))
        var long2 =parseInt(longitude.slice(3,5)) / 60;
        var long3 =parseInt(longitude.slice(6,8)) /3600;
        longitude = (long1 + long2 + long3).toFixed(2).toString() + longitude.slice(8,10)

      }
      else if(longitude.length == 11){
        var long1 = parseInt(longitude.slice(0,3))
        var long2 =parseInt(longitude.slice(4,6)) / 60;
        var long3 =parseInt(longitude.slice(7,9)) /3600;
        longitude = (long1 + long2 + long3).toFixed(2).toString() + longitude.slice(9,11)
      }


      console.log("STUFF,", latitude);
     if(latitude.length == 10){
       console.log("STUFF217", latitude);
       var lat1 = parseInt(latitude.slice(0,2))
       console.log('lat1', lat1);
       var lat2 =parseInt(latitude.slice(3,5)) / 60;
       console.log('lat2', lat2);
       var lat3 =parseInt(latitude.slice(6,8)) /3600;
       console.log('lat3', lat3);

       latitude = (lat1 + lat2 + lat3).toFixed(2).toString() + latitude.slice(8,10)
       console.log("STUFF217", latitude);
     }
     else if(latitude.length == 11){
       var lat1 = parseInt(latitude.slice(0,3))
       var lat2 =parseInt(latitude.slice(4,6)) / 60;
       var lat3 =parseInt(latitude.slice(7,9)) /3600;

       latitude = (lat1 + lat2 + lat3).toFixed(2).toString() + latitude.slice(9,11)
     }




      if(latitude[latitude.length -1] === "S"){
        latitude =  "-" + latitude.slice(0,5)
        $rootScope.latt1 = latitude
      }
      else{
        latitude = latitude.slice(0,5)
        $rootScope.latt1 = latitude
      }
      if(longitude[longitude.length -1] === "W"){
        longitude = "-" + longitude.slice(0,5)
        $rootScope.longg2 = longitude
      }
      else{
        longitude = longitude.slice(0,5)
        $rootScope.longg2 = longitude

      }

      console.log('latitude', latitude)
      console.log('longitude', longitude)


      // console.log("scope", $scope);
      $scope.showMaps = true;
      $state.go('searchMapsGoogleMaps', {latitudeId: latitude}, {longitudeId: longitude})
    })
    .catch(err => {
      console.log("error");
      alert('not found')
    })



  }///////	geo:32.775833,-96.796667

  // console.log('rootScope', $scope.latitude);
  $scope.map = { center: { latitude: $scope.latt1, longitude: $scope.longg2}, zoom: 8 };


  uiGmapGoogleMapApi.then(function(maps) {

      });


})
app.controller('searchMapsGoogleMapsCtrl', function($scope,uiGmapGoogleMapApi, Location, $rootScope,$state){

  console.log("$scope", $scope.latt1);
  console.log("$scope", $scope.longg2);

  var longitude;
  var latitude;
  $scope.searchLocation = (data) => {
    // console.log("line 85", data);
    Location.getData(data)
    .then(res => {

      longitude = res.data.longitude.replace(/°/gi, '.').replace(/′/gi, '.')
      latitude = res.data.latitude.replace(/°/gi, '.').replace(/′/gi, '.')
      console.log(longitude.replace(/″/gi, '.'));
      console.log(latitude.replace(/″/gi, '.'));

      if(longitude.length == 9){
        console.log("Logged!!!!!!!!!!");
        var long1 = parseInt(longitude.slice(0,1))
        var long2 =parseInt(longitude.slice(2,4)) / 60;
        var long3 =parseInt(longitude.slice(5,7)) /3600;
        longitude = (long1 + long2 + long3).toFixed(2).toString() + longitude.slice(7,9)
        console.log(longitude);
      }
      else if(longitude.length == 10){
        var long1 = parseInt(longitude.slice(0,2))
        var long2 =parseInt(longitude.slice(3,5)) / 60;
        var long3 =parseInt(longitude.slice(6,8)) /3600;
        longitude = (long1 + long2 + long3).toFixed(2).toString() + longitude.slice(8,10)

      }
      else if(longitude.length == 11){
        var long1 = parseInt(longitude.slice(0,3))
        var long2 =parseInt(longitude.slice(4,6)) / 60;
        var long3 =parseInt(longitude.slice(7,9)) /3600;
        longitude = (long1 + long2 + long3).toFixed(2).toString() + longitude.slice(9,11)
      }

      if(latitude.length == 9){

        var lat1 = parseInt(latitude.slice(0,1))
        var lat2 =parseInt(latitude.slice(2,4)) / 60;
        var lat3 =parseInt(latitude.slice(5,7)) /3600;

        latitude = (lat1 + lat2 + lat3).toFixed(2).toString() + latitude.slice(7,9)
      }

     else if(latitude.length == 10){

       var lat1 = parseInt(latitude.slice(0,2))
       var lat2 =parseInt(latitude.slice(3,5)) / 60;
       var lat3 =parseInt(latitude.slice(6,8)) /3600;

       latitude = (lat1 + lat2 + lat3).toFixed(2).toString() + latitude.slice(8,10)
     }
     else if(latitude.length == 11){
       var lat1 = parseInt(latitude.slice(0,3))
       var lat2 =parseInt(latitude.slice(4,6)) / 60;
       var lat3 =parseInt(latitude.slice(7,9)) /3600;

       latitude = (lat1 + lat2 + lat3).toFixed(2).toString() + latitude.slice(9,11)
     }




      if(latitude[latitude.length -1] === "S"){
        latitude =  "-" + latitude.slice(0,5)
        $rootScope.latt1 = latitude
      }
      else{
        latitude = latitude.slice(0,5)
        $rootScope.latt1 = latitude
      }


      if(longitude[longitude.length -1] === "W"){
        longitude = "-" + longitude.slice(0,5)
        $rootScope.longg2 = longitude
      }
      else{
        longitude = longitude.slice(0,5)
        $rootScope.longg2 = longitude

      }

      console.log('latitude', latitude)
      console.log('longitude', longitude)


      // console.log("scope", $scope);
      $scope.showMaps = true;
      $state.go('searchMapsGoogleMaps', {latitudeId: latitude}, {longitudeId: longitude})
    })
    .catch(err => {
      console.log("error");
      alert('not found')
    })



  }

  $scope.map = { center: { latitude: $scope.latt1, longitude: $scope.longg2}, zoom: 8 };


  uiGmapGoogleMapApi.then(function(maps) {

      });

})
