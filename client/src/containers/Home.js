/**
 * Created by Aus on 2018/2/28.
 */
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actions} from '../actions';
import { Link } from 'react-router-dom';

class Home extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            list: []
        };
    }
    getListDOM () {
        const {list} = this.props;

        return list.map((item)=>{

            const { headImgUrl, name, content, images, createTime, isLiked, comments } = item;

            return (
                <div className="list-container">
                    <div className="list-content">
                        <div className="list-title">
                            <Link className="name" to={'/user'}>{name}</Link>
                            <p className="content">{content}</p>
                        </div>
                    </div>
                </div>
            );
        });
    }
    render() {

        return (
            <div className="home-container">
                <h1>Hello World!</h1>
                <p>This is home page</p>
                {this.getListDOM()}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    list: state.home.list
});


export default connect(mapStateToProps, dispatch=> {return { ...bindActionCreators(actions,dispatch), dispatch}})(Home)