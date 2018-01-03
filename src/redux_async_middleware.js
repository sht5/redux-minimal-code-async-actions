const asyncActionsMiddleware = store => next => action => {
    const isActionAsync = action.hasOwnProperty('async');
    if (!isActionAsync) {
        return next(action);
    }
    else {
        const {httpMethodToInvoke, params, type} = action;
        const inProgressType = generateInProgressActionTypeName(type);
        //the resolved promise here is to make sure the action fired here comes after firing original action for example:
        //getData => getDataInProgress and not the other way round. hack suggested in redux forums.
        Promise.resolve(1).then(() => store.dispatch({type: inProgressType}));
        httpMethodToInvoke(...params)
            .then(resultsObj => {
                const successType = generateSuccessActionTypeName(type);
                Promise.resolve(1).then(() => store.dispatch({
                    type: successType,
                    ...resultsObj
                }));
            })
            .catch(err => {
                console.log(err);
                const errorType = generateErrorActionTypeName(type);
                Promise.resolve(1).then(() => store.dispatch({type: errorType, err}));
            });
        
        return next(action);
    }
};

const generateInProgressActionTypeName = (basicActionName) => `${basicActionName}_IN_PROGRESS`;
const generateSuccessActionTypeName = (basicActionName) => `${basicActionName}_SUCCESS`;
const generateErrorActionTypeName = (basicActionName) => `${basicActionName}_ERROR`;

module.exports = {
    generateErrorActionTypeName,
    generateInProgressActionTypeName,
    generateSuccessActionTypeName,
    asyncActionsMiddleware
}