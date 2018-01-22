/**
 * Created by Aus on 2018/1/18.
 */
import React from 'react';
import {List, InputItem, Button, WingBlank, WhiteSpace} from 'antd-mobile';
import Validate from 'public/Validate';
import Toast from 'components/toast';
import {actionCreators} from './store/actions';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

// 登录
class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            btnLoading: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleInputChange (type, val) {
        this.setState({[type]: val});
    }
    handleSubmit () {
        // 验证
        const {username, password} = this.state;

        const validate = Validate([
            {name: "用户名", value: username, require: true},
            {name: "密码", value: password, require: true}
        ]);

        if(validate.length > 0){
            Toast.error(validate[0].error);
            return;
        }

        this.setState({btnLoading: true});

        // 发送请求
        this.props.dispatch(actionCreators.fetchSignIn(username, password))
            .then((result)=>{
                this.setState({btnLoading: false});
                if(result.status){
                    Toast.success(result.message, ()=>{
                        // 跳到首页
                        // store存储个人信息
                        this.props.dispatch(actionCreators.updatePersonalInfo({username}));
                        this.props.history.push('/');
                    });
                    return;
                }

                if(result.data && result.data instanceof Object){
                    for(let i in result.data){
                        Toast.error(result.data[i]);
                        return;
                    }
                } else {
                    Toast.error(result.message);
                }
            });
    }
    render () {
        const {username, password, btnLoading} = this.state;

        return (
            <div className="sign-up-container">
                <List
                    renderHeader={() => '注册用户登录'}
                >
                    <InputItem
                        value={username}
                        placeholder="输入用户名"
                        onChange={this.handleInputChange.bind(this, 'username')}
                    >
                        用户名
                    </InputItem>
                    <InputItem
                        value={password}
                        type='password'
                        placeholder="输入密码"
                        onChange={this.handleInputChange.bind(this, 'password')}
                    >
                        密码
                    </InputItem>
                </List>

                <WingBlank size="lg">
                    <WhiteSpace size="lg" />
                    <Button
                        type="primary"
                        onClick={this.handleSubmit}
                        loading={btnLoading}
                        disabled={btnLoading}
                    >
                        登录
                    </Button>
                    <WhiteSpace size="lg" />
                    <Button onClick={()=>{this.props.history.push('/sign-up')}}>注册</Button>
                </WingBlank>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    site: state.site
});

export default connect(mapStateToProps,dispatch=> {return { ...bindActionCreators(actionCreators, dispatch), dispatch }})(SignIn)