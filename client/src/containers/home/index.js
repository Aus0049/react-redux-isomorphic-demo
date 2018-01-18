/**
 * Created by Aus on 2018/1/16.
 */
import React from 'react'
import TopBox from 'components/topBox'
import List from 'components/list'

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list: []
        };
    }
    componentDidMount () {
        const list = [
            {
                id: '1',
                headImgUrl: '',
                name: '赵大',
                content: '今天头条',
                images: [],
                createTime: 1516258930,
                isLiked: false,
                comments: [
                    {
                        id: '1-1',
                        from: {name: '赵大', id: 'apple'},
                        to: null,
                        content: '第一'
                    }
                ]
            },
            {
                id: '2',
                headImgUrl: '',
                name: '德广',
                content: '买到回家的车票了',
                images: [
                    {url: ''}
                ],
                createTime: 1516258910,
                isLiked: true,
                comments: [
                    {
                        id: '2-1',
                        from: {name: '吕焕霞', id: 'aa'},
                        to: null,
                        content: '傻广😁'
                    },
                    {
                        id: '2-2',
                        from: {name: '李德广', id: 'bb'},
                        to: {name: '吕焕霞', id: 'aa'},
                        content: '傻霞'
                    },
                    {
                        id: '2-3',
                        from: {name: '吕焕霞', id: 'aa'},
                        to: {name: '李德广', id: 'bb'},
                        content: '你是不是傻'
                    },
                    {
                        id: '2-4',
                        from: {name: '李德广', id: 'bb'},
                        to: {name: '吕焕霞', id: 'aa'},
                        content: '你才傻'
                    },
                    {
                        id: '2-5',
                        from: {name: '吕焕霞', id: 'aa'},
                        to: {name: '李德广', id: 'bb'},
                        content: '你傻你傻'
                    },
                ]
            }
        ];

        this.setState({
            list: list
        });
    }
    getListDOM () {
        const {list} = this.state;

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

export default Home