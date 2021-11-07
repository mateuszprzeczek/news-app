export const module = {
  rules: [
    {
      test: /\.vue$/,
      loader: 'vue-loader'
    },
    {
      test: /\.scss$/,
      loader: [
        'vue-style-loader',
        'css-loader',
        'sass-loader'
      ]
    }
  ]
};