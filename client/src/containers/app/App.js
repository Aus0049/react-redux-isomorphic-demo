import React, { Component } from 'react';
import { Router } from 'react-router'
import { Provider } from 'react-redux'
import Header from "components/header"
import history from "../../store/history"

class App extends Component {
  render() {
      const { routes, store } = this.props;

      return (
          <Provider store={store}>
              <div className="app-container">
                  <Header/>
                  {/*eslint react/no-children-prop: "off"*/}
                  <Router history={history} children={routes} />
              </div>
          </Provider>
      );
  }
}

export default App;
