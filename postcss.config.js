module.exports = {
   syntax: 'postcss-scss',
   plugins: [
      require('autoprefixer'),
      [
         'css-has-pseudo',
         {
            // Options css-has-pseudo
         },
      ],
   ],
};
