/**
 * Created by Aus on 2018/1/16.
 */
import React from 'react'
import 'antd-mobile/dist/antd-mobile.less';
import 'normalize.css';

class Layout extends React.Component {
    render () {
        return (
            <div className="layout-container">
                {this.props.children}
            </div>
        );
    }
}

export default Layout