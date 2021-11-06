const {alias, configPaths} = require('react-app-rewire-alias');
const aliasMap = configPaths('./src/configs/tsconfig.paths.json');

module.exports = alias(aliasMap)