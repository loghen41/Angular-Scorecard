var theScoreCard = angular.module("scoreCard");

theScoreCard.controller('GameController', ['$scope', 'courseInfo', function ($scope, courseInfo) {
        $scope.title = 'New Game';
        $scope.numPlayers = 0;
        $scope.players = [];
        $scope.theCourseId = 0;
        $scope.currentHole = 0;
        $scope.totalHoles = 0;
        $scope.holeInfo;
        $scope.courses = [];
        $scope.images = [{name: 'Mario', icon: '../images/Mario.png'}, {name: 'Luigi', icon:'../images/Luigi.png'}, {name: 'Toad', icon:'../images/Toad.png'},{name: 'Peach',icon: '../images/PrincessPeach.png'}];
        
        
        $scope.playGame = function () {
            $scope.players = [];
         for (var i = 1; i <= $scope.numPlayers; i++) {
              var playerTemplate = {
                id: i,
                name: '',
                score: [],
                playerScore: 0,
                skillLevel: '',
                icon:'',
                teeColor: ''
               
            };
            
             $scope.players.push(playerTemplate);
             
            console.log($scope.players);

        };
    };
    
   
    $scope.addScores = function() {
        for (var p = 0; p < $scope.numPlayers; p++) {
                        $scope.players[p].playerScore = 0;
                        for (var j = 0; j < $scope.players[0].score.length; j++) {
                            if (!$scope.players[p].score[j]) {
                                $scope.players[p].score[j] = 0;
                                $scope.players[p].playerScore = +$scope.players[p].playerScore + +$scope.players[p].score[j];
                        } else{
                                $scope.players[p].playerScore = +$scope.players[p].playerScore + +$scope.players[p].score[j];
                        }
                    }
     
         }
     };

      
        
        $scope.updateCourses = function (city) {
            courseInfo.getCourses('', '', city)
                    .then(function (value) {
                        $scope.courses = value.data.courses;

                    },
                            function () {
                                console.log("Your Query was Rejected");
                            }
                    );
        };
        
        $scope.theCourse = [];
        
        $scope.selectCourse = function (id) {
            courseInfo.selectCourse(id)
                    .then(function(value) {
                            $scope.theCourse = value.data;
                            $scope.totalHoles = value.data.course.hole_count;
                            $scope.holeInfo = value.data.course.holes;
                            console.log(JSON.stringify($scope.holeInfo));
                            console.log(JSON.stringify($scope.theCourse));
                            
                    },
                           function () {
                               console.log("Please select an actual Course.");
                           }
                    );         
        };


    }]);

    