"use strict";
app.controller("logsCrtl", ['$scope', 'NgTableParams', 'Services', function ($scope, NgTableParams, Services) {
    $scope.hello = 'hello';
    $scope.count = 0;
    $scope.min = '2018-03-04T00:00:00.000Z';
    $scope.max = '2018-03-04T00:10:00.000Z';
    $scope.searchString = '';

    /*$scope.flters = {
        min: '2018-03-04T00:00:00.000Z',
        max: '2018-03-04T00:10:00.000Z',
        searchString: 'login',
    };*/
    $scope.getCount = function () {
        // console.log('1==>', $scope.filters);
        Services.count({min:$scope.min, max:$scope.max,searchString:$scope.searchString}, function (success) {
            if (success.data.status) {
                $scope.count = success.data.count;
                console.log('$scope.count', $scope.count);
                $scope.init();
            } else {
                // Notification.error({message: success.data.message});
            }
        });
    };
    $scope.getCount();

    $scope.init = function () {
        console.log('init');
        $scope.logParams = new NgTableParams({
            page: 1, // show first page
            size: 10,
            sorting: {
                time: -1
            }
        }, {
            counts: [50, 100, 200],
            total: $scope.count,
            getData: function (params) {
                // cons
                $scope.loadTableData(params);
                // $scope.getDevices();
            }
        });
    };
    $scope.loadTableData = function (tableParams) {
        const pageable = {
            min: $scope.min,
            max:$scope.max,
            searchString:$scope.searchString,
            page: tableParams.page(),
            size: tableParams.count(),
            sort: tableParams.sorting(),
        };
        console.log('pageable', pageable);
        Services.data(pageable, function (success) {
            if (success.data.status) {
                tableParams.total(success.data.data.l);
                tableParams.data = success.data.data;
                $scope.currentPageOfLogs = success.data.data;
                console.log('$scope.count', $scope.currentPageOfLogs);
                // $scope.init();
            } else {
                // Notification.error({message: success.data.message});
            }
        });
    };
    // $scope.init();
/*
    Services.getAccounts(pageable, function (response) {
        $scope.invalidCount = 0;
        if (response.data.status) {
            tableParams.total(response.data.count);
            tableParams.data = response.data.accounts;
            $scope.currentPageOfAccounts = response.data.accounts;
            console.log('$scope.currentPageOfAccounts', $scope.currentPageOfAccounts);
        } else {
            Notification.error({message: response.data.messages[0]});
        }
    });*/
}]);