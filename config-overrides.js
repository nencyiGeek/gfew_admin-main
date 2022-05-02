module.exports = config => {
  require('react-app-rewire-postcss')(config, {
     plugins: loader => [
      require('postcss-rtl')()
    ]
  });

  return config;
};

const path = require('path');

module.exports = {
    paths: function (paths, env) {        
        paths.appBuild = path.join(paths.appBuild, '../dist');
        return paths;
    },
}
