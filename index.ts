import app from './src/app';
import './src/database';

function main() 
{
    app.listen(app.get('port'), app.get('host'))
    console.log(`🚀 Running on http://${app.get('host')}:${app.get('port')}`);
}

main();
