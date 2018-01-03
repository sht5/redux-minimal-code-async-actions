# redux-minimal-code-async-actions
redux middleware for minimalizing async action boilerplate.

## Intro
coding async actions with redux is complicated and requires a vast amount of code around every async need. even with libraries like redux-saga and redux-thunk the amount of code is significant. One would need to create action types for async call steps (inProgress, success, error) and write boilerplate code around it for every async call. 
This package reduces this code significantly using a redux middleware it exposes.

### Installation
`npm i --save redux-minimal-code-async-actions`

### usage
Add middleware to your store:
```js
import {asyncActionsMiddleware} from 'redux-minimal-code-async-actions'
const enhancers = [];
const middleware = [
    asyncActionsMiddleware,
];
const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
);

const store = createStore(
    myReducer,
    composedEnhancers,
);
```

##### define async action
```js
//when you want to make an async action create an action 
//with the following structure:
const getSomethingAsync ={
        type : "GET_SOMETHING",
        async : true,
        httpMethodToInvoke : methodWhichReturnsPromise,
        params : [param1,param2]
}
```
the async:true param is a flag notifying the middleware to act upon this action. the middleware then works as following:
- dispatches a "GET_SOMETHING_IN_PROGRESS" action
- invokes the httpMethodToInvoke method
- if the httpMethodToInvoke method resolves, it will then dispatch a "GET_SOMETHING_SUCCESS" action containing all properties of the object returned by the httpMethodToInvoke method.
- if the httpMethodToInvoke method rejects it will dispatch a "GET_SOMETHING_ERROR" action containing an err property with the rejected error object.

##### reducing the actions
use the generateInProgressActionTypeName, generateSuccessActionTypeName and generateErrorActionTypeName helper methods to generate action types for different states of the async request and reduce them
```js
import {generateInProgressActionTypeName, generateSuccessActionTypeName, generateErrorActionTypeName, } from 'redux-minimal-code-async-actions';
...
case generateSuccessActionTypeName("GET_SOMETHING"): {
            return {
                ...state,
                ["something"] : action.somethingResult
            }
        }
```

##### important notes
- httpMethodToInvoke method must return a promise (you can use async await for the task as well)
- if httpMethodToInvoke is resolved it should return an object, all object properties are spread into SUCCESS action as additional params to the action.
- params action param must be an array, it is spread into httpMethodToInvoke when invoked to provide with params for the method.
