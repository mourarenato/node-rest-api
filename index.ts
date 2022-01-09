import app from './src/app';
import './src/database';

function main() {
  app.listen(app.get('port'), app.get('host'));
  // eslint-disable-next-line no-console
  console.log(`🚀 Running on http://${app.get('host')}:${app.get('port')}`);
}

main();
