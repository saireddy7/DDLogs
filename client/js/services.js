app.factory('Services', function ($http) {
    return {
        count: function (filers, success, error) {
            // console.log('2==>',filters);
            $http({
                url: '/api/logs/count',
                method: "GET",
                params: filers
            }).then(success, error)
        },
        data: function (filters, success, error) {
            $http({
                url: '/api/logs/data',
                method: "GET",
                params: filters
            }).then(success, error)
        }
    }
});