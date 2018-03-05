/**
 * Created by Aus on 2018/2/28.
 */
import React, { Component } from 'react';
import axios from 'axios';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            list: []
        };
    }
    componentDidMount () {
        axios.get('/api/aaa')
            .then((res)=> res.data)
            .then((res)=>{
                this.setState({list: res.data});
            })
            .catch((err)=>{
                console.log('err');
                console.log(err);
            });
    }
    render() {
        return (
            <div className="home-container">
                <h1>Hello World!</h1>
                <p>This is home page</p>
            </div>
        )
    }
}