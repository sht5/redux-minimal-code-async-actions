'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var asyncActionsMiddleware = function asyncActionsMiddleware(store) {
    return function (next) {
        return function (action) {
            var isActionAsync = action.hasOwnProperty('async');
            if (!isActionAsync) {
                return next(action);
            } else {
                var httpMethodToInvoke = action.httpMethodToInvoke,
                    params = action.params,
                    type = action.type;

                var inProgressType = generateInProgressActionTypeName(type);
                //the resolved promise here is to make sure the action fired here comes after firing original action for example:
                //getData => getDataInProgress and not the other way round. hack suggested in redux forums.
                Promise.resolve(1).then(function () {
                    return store.dispatch({ type: inProgressType });
                });
                httpMethodToInvoke.apply(undefined, _toConsumableArray(params)).then(function (resultsObj) {
                    var successType = generateSuccessActionTypeName(type);
                    Promise.resolve(1).then(function () {
                        return store.dispatch(_extends({
                            type: successType
                        }, resultsObj));
                    });
                }).catch(function (err) {
                    console.log(err);
                    var errorType = generateErrorActionTypeName(type);
                    Promise.resolve(1).then(function () {
                        return store.dispatch({ type: errorType, err: err });
                    });
                });

                return next(action);
            }
        };
    };
};

var generateInProgressActionTypeName = function generateInProgressActionTypeName(basicActionName) {
    return basicActionName + '_IN_PROGRESS';
};
var generateSuccessActionTypeName = function generateSuccessActionTypeName(basicActionName) {
    return basicActionName + '_SUCCESS';
};
var generateErrorActionTypeName = function generateErrorActionTypeName(basicActionName) {
    return basicActionName + '_ERROR';
};

module.exports = {
    generateErrorActionTypeName: generateErrorActionTypeName,
    generateInProgressActionTypeName: generateInProgressActionTypeName,
    generateSuccessActionTypeName: generateSuccessActionTypeName,
    asyncActionsMiddleware: asyncActionsMiddleware
};