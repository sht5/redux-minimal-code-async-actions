# Redux-minimal-code-async-actions
Redux middleware for minimalizing async action boilerplate.

## Intro
Coding async actions with redux is complicated and requires a vast amount of code around every async need. Even with libraries like redux-saga and redux-thunk the amount of code is significant. One would need to create action types for async call steps (inProgress, success, error) and write boilerplate code around it for every async call. 
This package reduces this code significantly using a redux middleware it exposes.

### Installation
`npm i --save redux-minimal-code-async-actions`

### Usage
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
//When you want to make an async action create an action 
//With the following structure:
const getSomethingAsync ={
        type : "GET_SOMETHING",
        async : true,
        httpMethodToInvoke : methodWhichReturnsPromise,
        params : [param1,param2]
}
```
The async:true param is a flag notifying the middleware to act upon this action. The middleware then works as following:
- Dispatches a "GET_SOMETHING_IN_PROGRESS" action
- Invokes the httpMethodToInvoke method
- If the httpMethodToInvoke method resolves, it will then dispatch a "GET_SOMETHING_SUCCESS" action containing all properties of the object returned by the httpMethodToInvoke method.
- If the httpMethodToInvoke method rejects it will dispatch a "GET_SOMETHING_ERROR" action containing an err property with the rejected error object.

##### reducing the actions
Use the generateInProgressActionTypeName, generateSuccessActionTypeName and generateErrorActionTypeName helper methods to generate action types for different states of the async request and reduce them
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
- If httpMethodToInvoke is resolved it should return an object, all object properties are spread into SUCCESS action as additional params to the action.
- Params action param must be an array, it is spread into httpMethodToInvoke when invoked to provide with params for the method.
