console.log('loaded frontend app');

var frontend_app = angular.module('mean_demo', []);

frontend_app.controller('crud_controller', do_crud);

function do_crud($scope, $http) {
    console.log('inside do_crud');

    $scope.read = function () {
        console.log('reading all records');

        $http.get('/api/v2/read')
            .then(function (results) {
                console.log(results);
                $scope.users = results.data;
            });
    }

    $scope.read();

    $scope.create = function () {
        console.log('creating new user');

        var data = {
            user: $scope.input.user,
            role: $scope.input.role
        };

        $http.post('/api/v2/create', data)
            .then(function (message) {
                console.log(message);
                $scope.read();
            });
    }

    $scope.update = function (user) {
        console.log('updating user');
        console.log(user);

        var data = {
            _id: user._id,
            user: user.user,
            role: user.role
        };

        $http.put('/api/v2/update', data)
            .then(function (message) {
                console.log(message);
                $scope.read();
            });
    }

    $scope.delete = function (user) {
        console.log('deleting user');
        console.log(user);
        $http.delete('/api/v2/delete' + user._id)
            .then(function (message) {
                console.log(message);
            });
    }

}