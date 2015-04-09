var path = require('path');

var paths = {
  css: {
    sassSrc: path.resolve('./sass/**/*.scss'),
    dest: './dist',
    tmpDir: path.resolve('./.css-compiled'),
    mainFile: 'main.css',
    builtFile: 'components.css'
  }
};

module.exports = paths;
