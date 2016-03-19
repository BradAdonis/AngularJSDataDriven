myApp.controller('CheckinsController',['$scope','$rootScope','$firebaseObject', '$firebaseArray','FIREBASE_URL','$routeParams' '$location', function($scope, $rootScope,$firebaseObject, $firebaseArray,FIREBASE_URL, $routeParams, $location){
    
    $scope.whichMeeting = $routeParams.mID;
    $scope.whichUser = $routeParams.uID;
    
    var ref = new Firebase(FIREBASE_URL + 'users/' + $scope.whichUser + '/meetings/' + $scope.whichMeeting + '/checkins');
    
    var checkinslist = $firebaseArray(ref);
    $scope.checkins = checkinslist;

    $scope.order="firstname";
    $scope.direction = null;
    $scope.query='';
    $scope.recordId = '';

    $scope.addCheckin = function(){
        var checkinsInfo = $firebaseArray(ref);
        var myData = {
            firstname : $scope.user.firstname,
            lastname : $scope.user.lastname,
            email: $scope.user.email,
            date: Firebase.ServerValue.TIMESTAMP
        };
        
        checkinsInfo.$add(myData).then(function(){
            $location.path('/checkins/' + $scope.whichUser + '/' + $scope.whichMeeting + '/checkinslist');
        });
    }

    $scope.deleteCheckin = function(id){
        var delRef = new Firebase(FIREBASE_URL + 'users/' + $scope.whichUser + '/meetings' + $scope.whichMeeting + '/checkins/' + id);
        var record = $firebaseObject(delRef);
        record.$remove(id);
    };

    $scope.pickRandom = function(){
        var whichRecord = Math.round(Math.random() * (checkinslist.length - 1));
        $scope.recordId = checkinslist.$keyAt(whichRecord);
    };

    $scope.showLove = function(mycheckin){
        mycheckin.show = !mycheckin.show;

        if(mycheckin.userState == 'expanded'){
            mycheckin.userState = '';
        }
        else{
            mycheckin.userState = 'expanded';
        }
    };

    $scope.giveLove = function(mycheckin, mygift){
        var loveRef = new Firebase(FIREBASE_URL + 'users/' + $scope.whichUser + '/meetings' + $scope.whichMeeting + '/checkins/' + mycheckin.$id + '/awards');
        var checkinsArray = $firebaseArray(loveRef);

        var myData = {
            name: mygift,
            date: Firebase.ServerValue.TIMESTAMP
        };

        checkinsArray.$add(myData);
    };

    $scope.deleteLove = function(checkinId, award){
        var loveRef = new Firebase(FIREBASE_URL + 'users/' + $scope.whichUser + '/meetings' + $scope.whichMeeting + '/checkins/' + checkinId + '/awards');
        var record = $firebaseObject(loveRef);
        record.$remove(award);
    }
    
    var ref = new Firebase(FIREBASE_URL);
    var auth = $firebaseAuth(ref);
}]);