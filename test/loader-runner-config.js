const { runLoaders } = require('loader-runner');
const fs = require('fs');
const path = require('path');

module.exports = function (resource, options = {}, callback) {
  runLoaders({
    resource: resource,
    loaders: [
      {
        loader: path.join(__dirname, '../lib/index.js'),
        options
      }
    ],
    context: {
      minimize: true
    },
    readResource: fs.readFile.bind(fs)
  }, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      callback(result);
    }
  })
}


