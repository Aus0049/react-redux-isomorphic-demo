/**
 * Created by Aus on 2018/1/17.
 */
import React from 'react'
import PropTypes from 'prop-types';
import '../style/topBox.scss';

const TopBox = (props) => {
    const {name, backgroundImgUrl, userImageUrl, userImageCallBack, slogan } = props;

    const backgroundStyle = {
        background: `${backgroundImgUrl} 100% 100%`
    };

    return (
        <div className="top-box-container">
            <div className="top-box-user-box" style={backgroundStyle}>
                <p className="username">{name}</p>
                <img className="user-image" src={userImageUrl} alt="" onClick={userImageCallBack}/>
            </div>
            <p className="slogan">{slogan}</p>
        </div>
    );
};

TopBox.propTypes = {
    name: PropTypes.string,
    backgroundImgUrl: PropTypes.string,
    userImageUrl: PropTypes.string,
    slogan: PropTypes.string,
    userImageCallBack: PropTypes.func,
};

TopBox.defaultProps = {
    name: '',
    backgroundImgUrl: '',
    userImageUrl: '',
    slogan: '',
    userImageCallBack: function(){}
};


export default TopBox