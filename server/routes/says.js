/**
 * Created by Aus on 2018/1/25.
 */
const express = require('express');
const router = express.Router();

const logger = require('../config/logger_config').getLogger('route');

// 首页接口
router.get('/get-list', function (req, res, next) {
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

    res.send(createResultObj(true, '列表获取成功', list));
});

const createResultObj = (status = true, message = '', data = null) => ({
    status: status,
    message: message,
    data: data,
});

module.exports = router;