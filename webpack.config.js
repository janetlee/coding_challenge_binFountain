  var path = require('path');
    const DIST_DIR = path.resolve(__dirname, "./client/dist");
      // (distribution) path where you want bundle.js to bundle.js to be made
    const SRC_DIR = path.resolve(__dirname, "./client/src");
      // path to your jsx files
    module.exports = {
      entry: SRC_DIR + '/index.jsx',
        // file to be transpiled - main component
      output: {
        path: DIST_DIR,
          // output folder
        filename: 'bundle.js',
          // transpiled file name
      },
      module: {
        // goes to the loaders array in order
        // applies loader to every file that matches the regex in test property & in include folder
        loaders: [
          {
            test: /\.jsx?/,
            include: SRC_DIR,
            loader: 'babel-loader',
            query: {
              presets: ['react', 'babel-preset-env']
            }
          }
        ]
      }
    }