const path = require('path');
const getAbsolutePath = (pathDir) => path.resolve(__dirname, pathDir);
const getHtmlPlugins = (chunks) => {
  return chunks.map(
    ({ chunk, title }) =>
      new HtmlPlugin({
        template: getAbsolutePath('src/pages/Popup/index.html'),
        title: `${title}`,
        filename: `${chunk}.html`,
        chunks: [chunk],
      }),
  );
};

const Dotenv = require('dotenv-webpack');
const { ESBuildMinifyPlugin } = require('esbuild-loader');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    popup: getAbsolutePath('src/pages/Popup/index.tsx'),
    background: getAbsolutePath('src/pages/Background/index.ts'),
    productContent: getAbsolutePath('src/pages/Content/productContent/index.ts'),
    sizeTableContent: getAbsolutePath('src/pages/Content/sizeTableContent/index.ts'),
    getUserData: getAbsolutePath('src/pages/Content/getUserData/index.ts'),
  },
  output: {
    filename: 'script/[name].js',
    path: getAbsolutePath('build'),
  },
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        loader: 'esbuild-loader',
        options: {
          loader: 'tsx',
          target: 'esnext',
          tsconfigRaw: require('./tsconfig.json'),
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[hash]-[name].[ext]',
              publicPath: '',
            },
          },
        ],
      },

      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              fallback: 'file-loader',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
    alias: {
      '@src': getAbsolutePath('./src'),
      '@assets': getAbsolutePath('./assets'),
    },
  },
  optimization: {
    minimizer: [
      new ESBuildMinifyPlugin({
        target: 'es2015',
      }),
    ],
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  plugins: [
    new Dotenv({
      path: '.env',
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*', path.resolve(process.cwd(), 'build/**/*')],
    }),
    new CopyPlugin({
      patterns: [
        {
          from: getAbsolutePath('src'),
          to: getAbsolutePath('build'),
        },
      ],
    }),
    ...getHtmlPlugins([{ chunk: 'popup', title: 'Own-Size' }]),
  ],
};
