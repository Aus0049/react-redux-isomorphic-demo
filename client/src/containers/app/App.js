import React  from 'react';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import Header from "components/header"
import Routes from '../../routes'
import Layout from "../../layout"

const supportsHistory = 'pushState' in window.history

// 这个项目的容器
class App extends React.PureComponent {
  render() {
      const { store } = this.props;

      return (
          <Provider store={store}>
              <BrowserRouter forceRefresh={!supportsHistory}>
                  <Layout>
                      <Header/>
                      <Routes />
                  </Layout>
              </BrowserRouter>
          </Provider>
      );
  }
}

export default App;
