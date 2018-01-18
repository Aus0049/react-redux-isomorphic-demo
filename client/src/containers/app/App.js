import React  from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Header from 'components/header';
import Routes from '../../routes';
import Layout from '../../layout';
import moment from 'moment';

// 全局这是moment中文
moment.locale('zh-cn');

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
                      <div className="page-container">
                          <Routes />
                      </div>
                  </Layout>
              </BrowserRouter>
          </Provider>
      );
  }
}

export default App;
