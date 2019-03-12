const installPath = require.resolve('./lib/install.js');
if (fs.existsSync(installPath)) require(installPath);
