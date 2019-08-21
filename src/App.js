import React, { Component } from "react";
import "./index.css";
import Layout from "./hoc/Layout/Layout";
import BuilderBurger from "./containers/BurgerBuilder/BurgerBuilder";

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <BuilderBurger />
        </Layout>
      </div>
    );
  }
}

export default App;
