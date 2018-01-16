/**
 * Created by Aus on 2018/1/16.
 */
module.exports = {
    apps: [ //数组，可以指定多个服务
        {
            name: 'isomorphic-demo',
            script: 'bin/www',
            watch: true,
            env: {
                PORT: 9000, //node服务端口
                NODE_ENV: 'development'
            },
            env_production: {
                PORT:9000,
                NODE_ENV: 'production'
            }
        }
    ]
};