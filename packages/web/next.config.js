// @ts-check
const _ = require('lodash');
const withTypescript = require('@zeit/next-typescript');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const api = require('dota-data/files/vscripts/api');
const enums = require('dota-data/files/vscripts/enums');

module.exports = withTypescript({
  distDir: '../.next',
  /**
   * @param {import('webpack').Configuration} config
   */
  webpack(config, options) {
    config.resolve.alias['~utils'] = __dirname + '/src/utils';
    config.resolve.alias['~components'] = __dirname + '/src/components';

    config.module.rules.push({
      test: /\.svg$/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: '@svgr/webpack',
          options: { babel: false, dimensions: false },
        },
      ],
    });

    if (options.isServer) {
      config.plugins.push(
        new ForkTsCheckerWebpackPlugin({
          tsconfig: __dirname + '/tsconfig.json',
          tslint: __dirname + '/tslint.json',
        }),
      );
    }

    return config;
  },

  exportPathMap() {
    return {
      '/': { page: '/' },
      '/vscripts': { page: '/vscripts' },
      '/vscripts/functions': { page: '/vscripts', query: { scope: 'functions' } },
      '/vscripts/constants': { page: '/vscripts', query: { scope: 'constants' } },
      ..._.fromPairs(
        [...api, ...enums]
          .filter(({ kind }) => kind === 'class' || kind === 'enum')
          .map(({ name }) => [`/vscripts/${name}`, { page: '/vscripts', query: { scope: name } }]),
      ),
    };
  },
});
