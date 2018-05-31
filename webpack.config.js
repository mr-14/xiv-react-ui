const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  entry: {
    'Bar': './src/components/Bar/index.js',
    'Button': './src/components/Button/index.js',
    'Dialog': './src/components/Dialog/index.js',
    'Field': './src/components/Field/index.js',
    'Form': './src/components/Form/index.js',
    'Image': './src/components/Image/index.js',
    'List': './src/components/List/index.js',
    'Menu': './src/components/Menu/index.js',
    'Paper': './src/components/Paper/index.js',
    'Popover': './src/components/Popover/index.js',
    'Stepper': './src/components/Stepper/index.js',
    'Table': './src/components/Table/index.js',
  },
  output: {
    path: path.resolve('./dist'),
    filename: '[name].js',
    library: '',
    libraryTarget: 'umd'
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: {
          presets: ['babel-preset-env', 'babel-preset-react'],
          plugins: [
            'transform-class-properties',
            'syntax-trailing-function-commas',
            ['transform-object-rest-spread', { 'useBuiltIns': true }],
            'transform-es2015-template-literals',
            'transform-es2015-literals',
            'transform-es2015-arrow-functions',
            'transform-es2015-block-scoped-functions',
            ['transform-es2015-classes', { 'loose': true }],
            'transform-es2015-object-super',
            'transform-es2015-shorthand-properties',
            'transform-es2015-computed-properties',
            'transform-es2015-for-of',
            'check-es2015-constants',
            ['transform-es2015-spread', { 'loose': true }],
            'transform-es2015-parameters',
            ['transform-es2015-destructuring', { 'loose': true }],
            ['transform-es2015-block-scoping', { 'throwIfClosureRequired': true }]
          ]
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
}
