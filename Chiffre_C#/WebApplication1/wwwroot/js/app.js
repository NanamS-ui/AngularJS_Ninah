var app = angular.module('numberGameApp', []);

app.controller('NumbersController', function($scope, $http) {
    $scope.targetNumber = 0;
    $scope.randomNumbers = [];

    $scope.getRandomNumbers = function() {
        $http.get('/Numbers/random')
            .then(function(response) {
                $scope.targetNumber = response.data.targetNumber;
                $scope.randomNumbers = response.data.randomNumbers;
            })
            .catch(function(error) {
                console.error('Erreur lors de la récupération des nombres aléatoires:', error);
            });
    };

    $scope.getRandomNumbers();
});

