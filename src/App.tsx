import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import ThemeProvider from "theme";
import { BrowserRouter } from "react-router-dom";
import Routes from "routes/Routes";
import store from "redux/store";


import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <ThemeProvider>
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </div>
  );
}

export default App;
