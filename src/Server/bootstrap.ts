import register from 'ignore-styles';
register(['.css']);
require('@babel/register')({
  ignore: [/(node_modules)/],
  presets: ['@babel/preset-env', '@babel/preset-react']
});

require('./index');
