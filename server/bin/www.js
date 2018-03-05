/**
 * Created by Aus on 2018/3/5.
 */
/**
 * Module dependencies.
 */

const app = require('../app');
const debug = require('debug')('server:server');
const http = require('http');
const logger = require('../config/logger_config').getLogger('default');

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '9000');
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', (error)=>{
    logger.error('服务启动失败！');
    logger.error(error);
});
server.on('listening', ()=>{
    logger.info(`服务已启动 listing on port: ${port}！🍺`);
});

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}