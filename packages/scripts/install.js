try {
  require.resolve('./lib/install.js');
} catch (error) {
  return;
}

require('./lib/install.js');
