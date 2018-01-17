/**
 * Created by Aus on 2018/1/16.
 */
import React from 'react'
import Icon from 'component-font-awesome'

class Header extends React.Component {
    render () {
        return (
            <div className="header-container">
                <div className="header-left">
                    <Icon type="bars" />
                </div>
                <div className="header-title">朋友圈</div>
                <div className="header-right">
                    <Icon type="plus" />
                </div>
            </div>
        );
    }
}

export default Header