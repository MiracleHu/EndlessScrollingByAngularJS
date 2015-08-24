
var app = angular.module('scroll', []);
app.directive('whenScrolled', function() {
    return function(scope, elm, attr) {
        var raw = elm[0];
        
        elm.bind('scroll', function() {
            if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
                scope.$apply(attr.whenScrolled);
            }
        });
    };
});

app.controller('Main', function($scope,$http) {
    $scope.items = [];
    var jsonitems= [];
    $http.get('products.json').success(function(data){
        // console.log(data.data[0].fullName);
        jsonitems = data.data;
        $scope.loadMore();
    }).error(function(data){
        console.log('error');
    });
    var counter = 0;
    $scope.loadMore = function() {
        for (var i = counter; i < counter+6; i++) {
            $scope.items.push(jsonitems[i]);
            // console.log($scope.items);
        }
        counter += 6;
    };
    
    // $scope.loadMore();
});

