/**
 * Created by Aus on 2018/1/16.
 */
export default () => ({
    path: '404',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            const PageNotFound = require('./component/PageNotFound')['default']
            cb(null, PageNotFound)
        }, '404')
    },
})