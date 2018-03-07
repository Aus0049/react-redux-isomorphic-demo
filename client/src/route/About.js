/**
 * Created by Aus on 2018/3/7.
 */
import React from 'react';
import Loadable from 'react-loadable';
import Loading from './Loading';

const LoadableComponent = Loadable({
    loader: () => import('../containers/About'),
    loading: Loading,
});

// 异步加载About页面
export default class About extends React.Component {
    render() {
        return <LoadableComponent />;
    }
}