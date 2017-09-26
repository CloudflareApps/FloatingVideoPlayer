module.exports = {
  parser: 'sugarss',
  plugins: [
    require('postcss-nested')(),
    require('autoprefixer')()
  ]
}
