/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
   trailingComma: 'all',
   tabWidth: 3,
   semi: true,
   singleQuote: true,
   jsxSingleQuote: true,
   arrowParens: 'avoid',
   printWidth: 100,
   htmlWhitespaceSensitivity: 'css',
   overrides: [
      {
         files: ['.hbs', '.handlebars'],
         options: {
            parser: 'glimmer',
            // printWidth: 100,
            // singleQuote: true,
            // singleAttributePerLine: true,
            // arrowParens: 'always',
         },
      },
   ],
};

export default config;
