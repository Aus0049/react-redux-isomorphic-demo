/**
 * Created by Aus on 2018/1/16.
 */
import React from 'react'
import TopBox from 'components/topBox'
import List from 'components/list'
import { WingBlank } from 'antd-mobile';

class Home extends React.Component {
    render () {
        return (
            <div className="home-container">
                <TopBox />
                <WingBlank size="lg" >
                    <List />
                </WingBlank>
            </div>
        );
    }
}

export default Home