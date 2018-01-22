/**
 * Created by Aus on 2018/1/18.
 */
import React from 'react';
import {List, InputItem, Button, WingBlank, WhiteSpace} from 'antd-mobile';
import Validate from 'public/Validate';
import Toast from 'components/toast';
import {actionCreators} from './store/actions';

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

// 注册
class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            phone: '',
            password: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleInputChange (type, val) {

        if(type === 'phone') {
            this.setState({[type]: val.split(' ').join('')});
            return;
        }

        this.setState({[type]: val});
    }
    handleSubmit () {
        // 验证
        const {username, phone, password} = this.state;

        const validate = Validate([
            {name: "用户名", value: username, require: true, length: true, min: 2, max: 10},
            {name: "密码", value: password, require: true, length: true, min: 6, max: 10}
        ]);

        if(validate.length > 0){
            Toast.error(validate[0].error);
            return;
        }

        // 发送请求
        this.props.dispatch(actionCreators.fetchSignUp(username, phone, password))
            .then((result)=>{
                if(result.status){
                    Toast.success(result.message, ()=>{
                        // 跳到首页
                        this.props.history.push('/');
                    });
                    return;
                }

                if(result.data){
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
        const {username, phone, password} = this.state;

        return (
            <div className="sign-up-container">
                <List
                    renderHeader={() => '注册成为用户'}
                >
                    <InputItem
                        value={username}
                        placeholder="3位到10位用户名"
                        onChange={this.handleInputChange.bind(this, 'username')}
                    >
                        用户名
                    </InputItem>
                    <InputItem
                        value={phone}
                        type='phone'
                        placeholder="11位手机号"
                        onChange={this.handleInputChange.bind(this, 'phone')}
                    >
                        手机号
                    </InputItem>
                    <InputItem
                        value={password}
                        type='password'
                        placeholder="6位到10位密码"
                        onChange={this.handleInputChange.bind(this, 'password')}
                    >
                        密码
                    </InputItem>
                </List>

                <WingBlank size="lg">
                    <WhiteSpace size="lg" />
                    <Button type="primary" onClick={this.handleSubmit}>注册</Button>
                    <WhiteSpace size="lg" />
                </WingBlank>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    site: state.site
});

export default connect(mapStateToProps,dispatch=> {return { ...bindActionCreators(actionCreators, dispatch), dispatch }})(SignUp)