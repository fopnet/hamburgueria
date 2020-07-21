import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { applyMiddleware, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import App from "./App";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import { orderReducer, builderReducer, authReducer } from "./store/reducers";

const rootReducers = combineReducers({
  order: orderReducer,
  burgerBuilder: builderReducer,
  auth: authReducer,
});
const store = createStore(rootReducers, applyMiddleware(thunk));

const app = (
  <Provider store={store}>
    <BrowserRouter basename="/">
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();
