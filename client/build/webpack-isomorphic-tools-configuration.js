/**
 * Created by Aus on 2018/2/28.
 */

const webpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const config = require('../config/');

module.exports = {
    webpack_assets_file_path: `${config.base_path}/webpack-assets.json`,
    webpack_stats_file_path: `${config.base_path}/webpack-stats.json`,
    assets: {
        images: {
            extensions: ['png', 'jpg', 'gif', 'ico', 'svg']
        },
        fonts: {
            extensions: ['woff', 'woff2', 'eot', 'ttf', 'swf', 'otf']
        },
        // styles: {
        //     extensions: ['scss', 'css'],
        //     filter: function(module, regex, options, log) {
        //         if (options.development) {
        //             // in development mode there's webpack "style-loader",
        //             // so the module.name is not equal to module.name
        //             return webpackIsomorphicToolsPlugin.style_loader_filter(module, regex, options, log);
        //         } else {
        //             // in production mode there's no webpack "style-loader",
        //             // so the module.name will be equal to the asset path
        //             return regex.test(module.name);
        //         }
        //     },
        //     // How to correctly transform kinda weird `module.name`
        //     // of the `module` created by Webpack "css-loader"
        //     // into the correct asset path:
        //     path: webpackIsomorphicToolsPlugin.style_loader_path_extractor,
        //
        //     // How to extract these Webpack `module`s' javascript `source` code.
        //     // Basically takes `module.source` and modifies its `module.exports` a little.
        //     parser: webpackIsomorphicToolsPlugin.css_loader_parser
        // }
    }
}