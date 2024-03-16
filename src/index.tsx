import ReactDOM from "react-dom/client";
import Table from "./Table";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./redux/reducers/dataReducer";

import "../src/styles/main.scss";

const store = configureStore({ reducer: dataReducer });
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <div id="main-container">
      <Table />
    </div>
  </Provider>
);
