import React from "react";
import { createRoot } from "react-dom/client";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";

// import App.js
import App from "./App";

// configure redux
import userReducer from "./redux/reducers/user-reducer";

const Reducers = combineReducers({
  user: userReducer,
});
const store = createStore(Reducers, applyMiddleware(ReduxThunk));

// render app component

const root = ReactDOM.createRoot(document.getElementById("root"));
// const container = document.getElementById('root');
// const root = createRoot(container);

root.render(
  <ChakraProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </ChakraProvider>
);
