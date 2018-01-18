/**
 * Created by Aus on 2018/1/17.
 */
import React from 'react'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Icon from 'component-font-awesome';
import moment from 'moment';
import '../style/list.scss';

const List = (props) => {
    const { headImgUrl, name, content, images, createTime, isLiked, comments } = props;

    let imagesDOM, commentDOM;

    // 处理图片dom
    if (images.length !== 0) {
        const imageItems = [];

        if(images.length === 1){
            // 一张图片 尺寸特殊处理
            imageItems.push(
                <div key="one" className="img-box one">
                    <img src={images[0].url} alt=""/>
                </div>
            );
        } else {
            images.map((item)=>{
                imageItems.push(
                    <div key={item.url} className={classNames(['img-box', {'four': images.length === 4}])}>
                        <img src={item.url} alt=""/>
                    </div>
                );
            });
        }

        imagesDOM =
            <div className="list-img">
                {imageItems}
            </div>;
    }

    // 处理评论
    commentDOM = comments.map((item)=>(
        <li key={item.id} className="comment">
            <p className="name">{item.from.name}</p>
            {item.to ? <p className="content">回复</p> : null}
            {item.to ? <p className="name">{item.to.name}</p> : null}
            <p className="content">: {item.content}</p>
        </li>
    ));

    return (
        <div className="list-container">
            <Link className="list-head-box" to={'/user'}>
                <img className="head" src={headImgUrl} alt=""/>
            </Link>
            <div className="list-content">
                <div className="list-title">
                    <Link className="name" to={'/user'}>{name}</Link>
                    <p className="content">{content}</p>
                </div>
                {imagesDOM}
                <ul className="list-comment">
                    <li className="time-box">
                        <p className="time">{moment.unix(createTime).fromNow()}</p>
                        <Icon type="ellipsis-h" />
                        <Icon type={isLiked ? 'thumbs-up' : 'thumbs-o-up'} />
                    </li>
                    {commentDOM}
                </ul>
            </div>
        </div>
    );
};

List.propTypes = {
    headImgUrl: PropTypes.string,
    name: PropTypes.string,
    content: PropTypes.string,
    images: PropTypes.array,
    createTime: PropTypes.number,
    isLiked: PropTypes.bool,
    comments: PropTypes.array,
};

List.defaultProps = {
    headImgUrl: '',
    name: '',
    content: '',
    images: [],
    createTime: 0,
    isLiked: false,
    comments: []
};

export default List;
