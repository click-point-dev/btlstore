import path from 'path';
import fs, { readdirSync, statSync, readdir, stat } from 'fs';
import { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import autoprefixer from 'autoprefixer';

// const PUBLIC_FOLDER = `${__dirname}/public`;

// const isFile = (itemName: string): boolean => {
//    const itemPath = path.join(PUBLIC_FOLDER, itemName);
//    return statSync(itemPath).isFile();
// };

//рабочий вариант
// function getPages() {
//    const content = readdirSync(PUBLIC_FOLDER);
//    const pages = content.filter(
//       item =>
//          !isFile(item) &&
//          item !== 'images' &&
//          item !== 'fonts' &&
//          item !== 'assets',
//    );
//    return ['index', ...pages];
// }

// пыталя закодить массив страниц с учетом вложенности. пока не работает
// const arr: string[] = [];
// function getPages(base: string) {
//    readdirSync(base).forEach(item => {
//       if (statSync(base + '/' + item).isDirectory()) {
//          getPages(base + '/' + item);
//       } else {
//          arr.push(path.join(base, item));
//       }
//    });
// }
// getPages(PUBLIC_FOLDER); //?
// arr.length; //?

// const pagesArray = [
//    ...arr
//       .filter(item => path.basename(item) === 'index.hbs')
//       .map(
//          item =>
//             path.basename(path.dirname(item)) !== 'public' &&
//             path.basename(path.dirname(item)),
//       ),
//    'index',
// ];

type Mode = 'production' | 'development';

interface EnvVariables {
   mode: Mode;
   port: number;
}

const config = (env: EnvVariables): Configuration => {
   const isDev = env.mode === 'development';
   const isProd = env.mode === 'production';

   return {
      mode: env.mode ?? 'development',
      entry: path.resolve(__dirname, 'src', 'index.ts'),
      output: {
         filename: 'bundle-[contenthash].js',
         path: path.resolve(__dirname, 'build'),
         clean: true,
         // publicPath: `/`,
      },
      module: {
         rules: [
            {
               test: /\.s[ac]ss$/i,
               exclude: /node_modules/,
               use: isProd
                  ? [
                       MiniCssExtractPlugin.loader,
                       //   'style-loader',
                       {
                          loader: 'css-loader',
                          options: { importLoaders: 2 },
                       },
                       'postcss-loader',
                       'sass-loader',
                    ]
                  : [
                       'style-loader',
                       {
                          loader: 'css-loader',
                          options: { importLoaders: 2 },
                       },
                       //   'postcss-loader',
                       {
                          loader: 'sass-loader',
                          options: {
                             sourceMap: true, // <-- !!IMPORTANT!!
                          },
                       },
                    ],
            },
            {
               test: /\.css$/i,
               exclude: /node_modules/,
               use: isProd
                  ? [
                       MiniCssExtractPlugin.loader,
                       {
                          loader: 'css-loader',
                          options: { importLoaders: 1 },
                       },
                       'postcss-loader',
                    ]
                  : [
                       'style-loader',
                       {
                          loader: 'css-loader',
                          options: { importLoaders: 1 },
                       },
                       //   'postcss-loader',
                    ],
            },
            {
               test: /\.tsx?$/,
               use: 'ts-loader',
               exclude: /node_modules/,
            },
            isProd && {
               test: /\.(?:js|mjs|cjs)$/,
               exclude: /node_modules/,
               use: {
                  loader: 'babel-loader',
                  options: {
                     presets: [['@babel/preset-env', { targets: 'defaults' }]],
                  },
               },
            },
            {
               test: /\.hbs$/,
               loader: 'handlebars-loader',
               options: {
                  rootRelative: [__dirname + '/src/'],
               },
            },
            {
               test: /\.(png|jpe?g|gif|webp|svg)$/i,
               type: 'asset/resource',
               generator: {
                  filename: './images/[base]',
               },
            },
            {
               test: /\.(eot|ttf|woff)$/i,
               type: 'asset/resource',
               generator: {
                  filename: './fonts/[base]',
               },
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
         // ...getPages().map(
         //    page =>
         //       new HtmlWebpackPlugin({
         //          template:
         //             page === 'index'
         //                ? path.resolve(__dirname, 'public', 'index.hbs')
         //                : path.resolve(
         //                     __dirname,
         //                     'public',
         //                     `${page}/index.hbs`,
         //                  ),
         //          filename:
         //             page === 'index' ? `index.html` : `${page}/index.html`,
         //          favicon: path.resolve(__dirname, 'public', 'favicon.ico'),
         //       }),
         // ),
         ...[
            'index',
            'about',
            'components',
            'contacts',
            'cases/mts-blog-and-voice',
            'cases/zhiznmart',
            'cases/gloria-jeans',
            'cases/tnt',
            'cases/eastern-special-equipment',
            'cases/razumnye-ot-naroda',
            'cases/gazpromneft-innovacii',
            'cases/mts-30-let',
            'cases/kari',
            'cases/rzhd',
            'services',
            'vacancies',
            'portfolio',
            '404',
            'event',
            'pr',
            'btl',
            'btl/chelyabinsk',
            'btl/ekaterinburg',
            'btl/irkutsk',
            'btl/krasnodar',
            'btl/krasnoyarsk',
            'btl/nizhnii-novgorod',
            'btl/novosibirsk',
            'btl/omsk',
            'btl/perm',
            'btl/samara',
            'btl/saratov',
            'btl/tomsk',
            'btl/ufa',
            'btl/volgograd',
            'btl/voronezh',
            'promotional-staff',
            'cases/alfabank',
            'cases/bochkarev',
            'cases/burger-king',
            'cases/heineken',
            'cases/jagermaster',
            'cases/komandor',
            'cases/megafon',
            'cases/red-bull',
            'cases/rosselhozbank',
            'cases/rosselhozbank-2',
            'cases/sovkombank',
            'cases/tele2',
            'cases/za-rodinu',
            'cases/glazka',
            'cases/trakresurs',
            'cases/novie-metallurgicheskie-tehnologii',
            'corporate-events',
            'corporate-events/chelyabinsk',
            'corporate-events/ekaterinburg',
            'corporate-events/irkutsk',
            'corporate-events/krasnodar',
            'corporate-events/krasnoyarsk',
            'corporate-events/nizhnii-novgorod',
            'corporate-events/novosibirsk',
            'corporate-events/omsk',
            'corporate-events/perm',
            'corporate-events/samara',
            'corporate-events/saratov',
            'corporate-events/tomsk',
            'corporate-events/ufa',
            'corporate-events/volgograd',
            'corporate-events/voronezh',
            'privacy',
            'anketa-promoter',
            'event-marketing',
            'event-marketing/chelyabinsk',
            'event-marketing/ekaterinburg',
            'event-marketing/irkutsk',
            'event-marketing/krasnodar',
            'event-marketing/krasnoyarsk',
            'event-marketing/nizhnii-novgorod',
            'event-marketing/novosibirsk',
            'event-marketing/omsk',
            'event-marketing/perm',
            'event-marketing/samara',
            'event-marketing/saratov',
            'event-marketing/tomsk',
            'event-marketing/ufa',
            'event-marketing/volgograd',
            'event-marketing/voronezh',
         ].map(
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
               {
                  from: path.resolve(__dirname, 'api'),
                  to: path.resolve(__dirname, 'build', 'api'),
                  noErrorOnMissing: true,
               },
            ],
         }),
      ],
      devtool: isDev ? 'eval-source-map' : false,

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
                 //   publicPath: '/',
              },
           }
         : undefined,
   };
};

export default config;
