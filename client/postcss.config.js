/**
 * Created by Aus on 2018/1/17.
 */
const pxtorem = require('postcss-px2rem');
const autoprefixer = require('autoprefixer');

module.exports = {
    plugins: [
        pxtorem({
            rootValue: 100,
            unitPrecision: 5,
            propWhiteList: [],
            propBlackList: [],
            selectorBlackList: [],
            ignoreIdentifier: false,
            replace: true,
            mediaQuery: false,
            minPixelValue: 0
        }),
        autoprefixer({browsers: ['last 2 versions']})
    ]
};