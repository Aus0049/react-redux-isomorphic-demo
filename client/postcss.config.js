/**
 * Created by Aus on 2018/1/17.
 */
// const pxtorem = require('postcss-pxtorem');
const autoprefixer = require('autoprefixer');

module.exports = {
    plugins: [
        // antd-mobile 2 不再使用rem布局方案
        // pxtorem({
        //     rootValue: 100,
        //     unitPrecision: 5,
        //     propWhiteList: [],
        //     propBlackList: [],
        //     selectorBlackList: [],
        //     ignoreIdentifier: false,
        //     replace: true,
        //     mediaQuery: false,
        //     minPixelValue: 0
        // }),
        autoprefixer({browsers: ['last 2 versions']})
    ]
};