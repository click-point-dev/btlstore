import path from 'path';
import { readdirSync, statSync } from 'fs';
import { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyPlugin from 'copy-webpack-plugin';

const PUBLIC_FOLDER = `${__dirname}/public`;

const isFile = (itemName: string): boolean => {
   const itemPath = path.join(PUBLIC_FOLDER, itemName);
   return statSync(itemPath).isFile();
};

function getPages() {
   const content = readdirSync(PUBLIC_FOLDER);
   const pages = content.filter(
      item =>
         !isFile(item) &&
         item !== 'images' &&
         item !== 'fonts' &&
         item !== 'assets',
   );
   return ['index', ...pages];
}

type Mode = 'production' | 'development';

interface EnvVariables {
   mode: Mode;
   port: number;
}

// const PAGES: string[] = ['index', 'about'];

const config = (env: EnvVariables): Configuration => {
   const isDev = env.mode === 'development';
   const isProd = env.mode === 'production';

   return {
      mode: env.mode ?? 'development',
      entry: path.resolve(__dirname, 'src', 'index.ts'),
      // entry: pages.reduce((config, page) => {
      // 	config[page] = `./src/${page.toLowerCase()}/${page.toLowerCase()}.js`;
      // 	return config;
      // }, {}),
      output: {
         filename: 'bundle-[contenthash].js',
         path: path.resolve(__dirname, 'build'),
         clean: true,
         // publicPath: `${__dirname}/build`,
      },
      module: {
         rules: [
            {
               test: /\.s[ac]ss$/i,
               use: [
                  // Creates `style` nodes from JS strings
                  isProd ? MiniCssExtractPlugin.loader : 'style-loader',
                  // Translates CSS into CommonJS
                  'css-loader',
                  // Compiles Sass to CSS
                  'sass-loader',
               ],
            },
            {
               test: /\.css$/i,
               use: [
                  isProd ? MiniCssExtractPlugin.loader : 'style-loader',
                  'css-loader',
               ],
            },
            {
               test: /\.tsx?$/,
               use: 'ts-loader',
               exclude: /node_modules/,
            },
            {
               test: /\.hbs$/,
               loader: 'handlebars-loader',
               options: {
                  rootRelative: [__dirname + '/src/'],
               },
            },
            {
               test: /\.(png|svg|jpg|jpeg|gif|webp|pdf)$/i,
               type: 'asset/resource',
            },
         ],
      },
      resolve: {
         extensions: [
            '.tsx',
            '.ts',
            '.js',
            '.css',
            '.scss',
            '.hbs',
            '.handlebars',
         ],
         alias: {
            '@img': path.resolve(__dirname, 'public/images'),
            '@fonts': path.resolve(__dirname, 'public/fonts'),
         },
      },
      plugins: [
         ...getPages().map(
            page =>
               new HtmlWebpackPlugin({
                  template:
                     page === 'index'
                        ? path.resolve(__dirname, 'public', 'index.hbs')
                        : path.resolve(
                             __dirname,
                             'public',
                             `${page}/index.hbs`,
                          ),
                  filename:
                     page === 'index' ? `index.html` : `${page}/index.html`,
                  favicon: path.resolve(__dirname, 'public', 'favicon.ico'),
               }),
         ),

         isProd &&
            new MiniCssExtractPlugin({
               filename: 'css/[name].min-[contenthash:8].css',
               chunkFilename: 'css/[name].min-[contenthash:8].css',
            }),
         new CopyPlugin({
            patterns: [
               {
                  from: path.resolve(__dirname, 'public', 'images'),
                  to: path.resolve(__dirname, 'build', 'images'),
                  noErrorOnMissing: true,
               },
               {
                  from: path.resolve(__dirname, 'public', 'fonts'),
                  to: path.resolve(__dirname, 'build', 'fonts'),
                  noErrorOnMissing: true,
               },
               {
                  from: path.resolve(__dirname, 'public', 'assets'),
                  to: path.resolve(__dirname, 'build', 'assets'),
                  noErrorOnMissing: true,
               },
            ],
         }),
      ],
      devtool: isDev ? 'inline-source-map' : false,

      devServer: isDev
         ? {
              watchFiles: ['public/**/*', 'src/**/*'],
              port: env.port ?? 8686,
              open: {
                 app: {
                    name: 'chrome',
                    arguments: ['--incognito'],
                 },
              },
              client: {
                 logging: 'info',
                 overlay: true,
              },
              hot: true,
              static: {
                 directory: path.resolve(__dirname, 'public'),
                 publicPath: './',
              },
           }
         : undefined,
   };
};

export default config;
