const { runLoaders } = require('loader-runner');
const fs = require('fs');
const path = require('path');

runLoaders({
  resource: path.join(__dirname, './src/index.html'),
  loaders: [
    {
      loader: path.join(__dirname, './lib/index.js'),
      options: {
        buildTime: '2020-06-19'
      }
    }
  ],
  context: {
    minimize: true,
    emitFile: content => {
      fs.writeFile(path.join(__dirname, './src/inline.html'), content, err => {});
    }
  },
  readResource: fs.readFile.bind(fs)
}, function (err, result) {
  if (err) {
    console.log(err);
  }
})

