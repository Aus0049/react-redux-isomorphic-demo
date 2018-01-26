/**
 * Created by Aus on 2018/1/16.
 */
import React from 'react'
import Icon from 'component-font-awesome'
import {Popover} from 'antd-mobile'
import {actionCreators} from '../../../containers/site/store/actions'
import {withRouter} from "react-router-dom";

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

const Item = Popover.Item;

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isPopoverShow: false
        };
        this.handleVisibleChange = this.handleVisibleChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }
    handleVisibleChange (visible) {
        this.setState({isPopoverShow: visible});
    }
    handleSelect (value) {
        this.setState({isPopoverShow: false});
        if(value.props.value === 'signOut'){
            // 注销
            this.signOut();
        } else if (value.props.value === 'add') {
            // 跳转
        }
    }
    signOut () {
        // 注销
        this.props.dispatch(actionCreators.fetchSignOut())
            .then((res)=>{
                if(res.status){
                    // 隐藏显示
                    this.props.history.push('/sign-in');
                }
            });
    }
    getOverLayDOM () {
        const overlayDOM = [];

        overlayDOM.push(
            <Item key="signOut" value="signOut" icon={<Icon type="sign-out"/>} >注销</Item>,
            <Item key="add" value="add" icon={<Icon type="plus"/>} >发朋友圈</Item>
        );

        return overlayDOM;
    }
    render () {
        const {isPopoverShow} = this.state;
        const overlayDOM = this.getOverLayDOM();

        return (
            <div className="header-container">
                <div className="header-left">
                    <Icon type="bars" />
                </div>
                <div className="header-title">朋友圈</div>
                <div className="header-right">
                    <Popover
                        mask
                        visible={isPopoverShow}
                        overlay={overlayDOM}
                        onVisibleChange={this.handleVisibleChange}
                        onSelect={this.handleSelect}
                    >
                        <div>
                            <Icon type="ellipsis-h" />
                        </div>
                    </Popover>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    home: state.home
});

export default withRouter(connect(mapStateToProps,dispatch=> {return { ...bindActionCreators(actionCreators, dispatch), dispatch }})(Header));