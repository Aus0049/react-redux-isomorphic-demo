/**
 * Created by Aus on 2018/1/16.
 */
import React from 'react'
import { NavBar } from 'antd-mobile'

class Header extends React.Component {
    render () {
        return (
            <div className="header-container">
                <NavBar mode="dark" >
                    首页
                </NavBar>
            </div>
        );
    }
}

export default Header