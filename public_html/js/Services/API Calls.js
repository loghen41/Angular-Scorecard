/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var theScoreCard =  angular.module("scoreCard");

theScoreCard.factory('courseInfo', ['$http', function ($http) {
    var obj = {};
    
    obj.getCourses = function(country, state, city, name, address) {
        
        var promise;
        promise = $http({
            method: 'POST',
            url: 'http://golf-courses-api.herokuapp.com/courses/search',
            "data": {
                "country": country || '',
                "state": state || '',
                "city": city || '',
                "name": name || '',
                "address": address || ''
            }
        });
        return promise;
    };
    
    Object.defineProperty(
            obj,
            "selectCourse", 
            {
                'configurable': false,
                'enumerable': false,
                'value' : function(id) {
                    var newPromise;
                    newPromise = $http({
                        method: 'GET',
                        url: 'http://golf-courses-api.herokuapp.com/courses/'+ id
                    });
                    return newPromise;
                }
            }
        
        );
    
    return obj;
        
}]); 
