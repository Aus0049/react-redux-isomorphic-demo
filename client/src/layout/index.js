/**
 * Created by Aus on 2018/1/16.
 */
import React from 'react'
// import all style here
import 'normalize.css';
import 'antd-mobile/dist/antd-mobile.less';
import 'font-awesome/css/font-awesome.css';
import '../style/public.scss'

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