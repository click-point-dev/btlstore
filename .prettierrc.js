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
   // overrides: [
   //    {
   //       files: ['*.hbs', '*.handlebars'],
   //       options: {
   //          parser: 'angular',
   //          singleQuote: true,
   //          singleAttributePerLine: true,
   //          arrowParens: 'always',
   //       },
   //    },
   // ],
};

export default config;
