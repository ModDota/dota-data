// @ts-check
/* eslint-disable @typescript-eslint/no-require-imports */
const path = require('path');
const _ = require('lodash');
const withTypescript = require('@zeit/next-typescript');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const api = require('dota-data/files/vscripts/api');
const enums = require('dota-data/files/vscripts/enums');
/* eslint-enable @typescript-eslint/no-require-imports */

// eslint-disable-next-line import/no-commonjs
module.exports = withTypescript({
  distDir: '../.next',
  /**
   * @param {import('webpack').Configuration} config
   */
  webpack(config, options) {
    config.resolve.alias['~utils'] = path.join(__dirname, 'src/utils');
    config.resolve.alias['~components'] = path.join(__dirname, 'src/components');

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
        new ForkTsCheckerWebpackPlugin({ tsconfig: path.join(__dirname, 'tsconfig.json') }),
      );
    }

    return config;
  },

  exportPathMap: () => ({
    '/': { page: '/' },
    '/vscripts': { page: '/vscripts' },
    '/vscripts/functions': { page: '/vscripts', query: { scope: 'functions' } },
    '/vscripts/constants': { page: '/vscripts', query: { scope: 'constants' } },
    ..._.fromPairs(
      [...api, ...enums]
        .filter(({ kind }) => kind === 'class' || kind === 'enum')
        .map(({ name }) => [`/vscripts/${name}`, { page: '/vscripts', query: { scope: name } }]),
    ),
  }),
});
