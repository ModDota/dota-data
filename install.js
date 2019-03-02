try {
  require('./lib/install.js');
} catch (err) {
  if (err.code !== 'MODULE_NOT_FOUND') throw err;
  console.log('Install script skipped');
}
