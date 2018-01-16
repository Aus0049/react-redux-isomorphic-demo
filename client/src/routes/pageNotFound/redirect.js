/**
 * Created by Aus on 2018/1/16.
 */
export default {
    path: '*',
    indexRoute: {
        onEnter (nextState, replace) {
            replace('/404')
        },
    },
}
