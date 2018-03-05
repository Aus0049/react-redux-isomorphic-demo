/**
 * Created by Aus on 2018/3/2.
 */
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Logo from '../../../public/images/react.svg';

class Header extends Component {
    render() {
        return (
            <div className="header-container">
                <ul>
                    <li className="logo">
                        <img src={Logo} alt=""/>
                    </li>
                    <li className="link">
                        <Link to={'/home'}>Home</Link>
                    </li>
                    <li className="link">
                        <Link to={'/about'}>about</Link>
                    </li>
                </ul>
            </div>
        )
    }
}

export default Header