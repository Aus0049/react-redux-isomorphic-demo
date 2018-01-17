/**
 * Created by Aus on 2018/1/17.
 */
import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Icon from 'component-font-awesome'
import '../style/list.scss';

const List = (props) => {
    const {headImgUrl, name, content} = props;

    return (
        <div className="list-container">
            <Link className="list-head-box" to={'/user'}>
                <img className="head" src={headImgUrl} alt=""/>
            </Link>
            <div className="list-content">
                <div className="list-title">
                    <Link className="name" to={'/user'}>{name}</Link>
                    <p className="content">{content}</p>
                </div>
                <div className="list-img"></div>
                <ul className="list-comment">
                    <li className="time-box">
                        <p className="time">37分钟前</p>
                        <Icon className="icon" type="ellipsis-h"></Icon>
                    </li>
                    <li className="comment"></li>
                </ul>
            </div>
        </div>
    );
};

List.propTypes = {
    headImgUrl: PropTypes.string,
    name: PropTypes.string,
    content: PropTypes.string,
};

List.defaultProps = {
    headImgUrl: '',
    name: 'dsadsa',
    content: 'dsadsdsadsadsadsadsadsa'
};

export default List;
