const withPlugins = require('next-compose-plugins');
const webpack = require('webpack');

module.exports = withPlugins([], {
    webpack: (config: { module: { rules: { test: RegExp; use: string; }[]; }; }) => {
        config.module.rules.push({
            test: /\.license$/,
            use: 'raw-loader',
        });

        return config;
    },
});
