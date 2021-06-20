import { createStore, applyMiddleware } from "redux"; //se saco compose
import rootReducer from "../reducer/index";
import thunk from "redux-thunk";
import {composeWithDevTools} from 'redux-devtools-extension';

//const enhancers = [reduxChrome, applyMiddleware(thunk)];

const store = createStore(
    rootReducer,
    //compose(...enhancers)
    composeWithDevTools(applyMiddleware(thunk))
    
);
  
export default store;