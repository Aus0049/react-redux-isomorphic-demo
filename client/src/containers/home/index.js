/**
 * Created by Aus on 2018/1/16.
 */
import React from 'react'
import TopBox from 'components/topBox'
import List from 'components/list'
import Toast from 'components/toast'
import {actionCreators} from './store/actions'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount () {

        this.props.dispatch(actionCreators.fetchList())
            .then((res)=>{

                if(res.code === 201){
                    Toast.error(res.message);
                    // 跳转登录
                    this.props.history.push('/sign-in');
                }
            })
    }
    getListDOM () {
        const {list} = this.props.home;

        return list.map((item)=>(<List key={item.id} {...item} />));
    }
    render () {
        const listDOM = this.getListDOM();

        return (
            <div className="home-container">
                <TopBox />
                {listDOM}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    home: state.home
});

export default connect(mapStateToProps,dispatch=> {return { ...bindActionCreators(actionCreators, dispatch), dispatch }})(Home)